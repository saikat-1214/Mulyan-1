from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import os

from app.database import engine, Base, get_db
from app import models
from app.ai.pipeline import AIPipeline
from app.compliance_engine import ComplianceEngine
from app.evidence import EvidenceVault
from app.routing import GeoRouter

# Initialize AI and Compliance modules
ai_pipeline = AIPipeline()
compliance_engine = ComplianceEngine()

try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print("Could not initialize DB tables, make sure the DB is running and PostGIS is enabled:", e)

app = FastAPI(title="SIH26034 API - Legal Metrology")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to SIH26034 Legal Metrology API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/scan")
async def scan_product(
    image: UploadFile = File(...),
    selling_price: float = Form(None)
):
    image_bytes = await image.read()
    parsed_data = ai_pipeline.run(image_bytes)
    violations = compliance_engine.evaluate(parsed_data, selling_price)
    
    return {
        **parsed_data,
        "violations": violations
    }

@app.post("/api/evidence")
async def secure_evidence(
    latitude: float = Form(...),
    longitude: float = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Secures the uploaded image with a SHA-256 hash incorporating GPS and UTC time.
    """
    image_bytes = await image.read()
    timestamp = datetime.utcnow().isoformat()
    
    # 1. Generate Cryptographic Hash
    evidence_hash = EvidenceVault.generate_hash(image_bytes, latitude, longitude, timestamp)
    
    # 2. (Mock) Save file to object storage (e.g. S3). Here we just simulate an S3 URL.
    file_url = f"https://s3.mock.url/evidence/{evidence_hash}.jpg"
    
    # 3. Save to database
    new_evidence = models.Evidence(
        file_url=file_url,
        sha256_hash=evidence_hash,
        latitude=latitude,
        longitude=longitude,
        captured_at=datetime.utcnow()
        # complaint_id would be attached in the next step when complaint is filed
    )
    db.add(new_evidence)
    db.commit()
    db.refresh(new_evidence)
    
    evidence_id = EvidenceVault.construct_evidence_id(new_evidence.id)
    
    return {
        "evidence_id": evidence_id,
        "hash": evidence_hash,
        "timestamp": timestamp,
        "file_url": file_url,
        "db_id": new_evidence.id
    }

@app.post("/api/complaints")
def submit_complaint(
    evidence_id: int,
    latitude: float,
    longitude: float,
    violation_type: str,
    db: Session = Depends(get_db)
):
    """
    Submits a complaint and automatically routes it to the correct local authority via PostGIS.
    """
    # 1. Geo-Route the complaint
    jurisdiction, officer = GeoRouter.find_jurisdiction(db, latitude, longitude)
    
    assigned_officer_id = officer.id if officer else None
    
    # 2. Create the Complaint
    new_complaint = models.Complaint(
        violation_type=violation_type,
        severity="HIGH",
        latitude=latitude,
        longitude=longitude,
        assigned_officer=assigned_officer_id,
        status="Assigned" if assigned_officer_id else "Filed"
    )
    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)
    
    # 3. Attach evidence to complaint
    evidence_record = db.query(models.Evidence).filter(models.Evidence.id == evidence_id).first()
    if evidence_record:
        evidence_record.complaint_id = new_complaint.id
        db.commit()
        
    return {
        "message": "Complaint submitted successfully.",
        "complaint_id": new_complaint.id,
        "routed_to_jurisdiction": jurisdiction.district if jurisdiction else "National Queue (No Local Polygon Found)",
        "assigned_officer_id": assigned_officer_id
    }

@app.get("/api/dashboard/complaints")
def get_officer_complaints(
    officer_id: int,
    status: str = None,
    db: Session = Depends(get_db)
):
    """
    Returns complaints assigned to a specific officer for their dashboard.
    Calculates SLA breaches dynamically.
    """
    query = db.query(models.Complaint).filter(models.Complaint.assigned_officer == officer_id)
    
    if status:
        query = query.filter(models.Complaint.status == status)
        
    complaints = query.order_by(models.Complaint.created_at.desc()).all()
    
    # Calculate SLA status for each complaint
    results = []
    now = datetime.utcnow()
    
    for c in complaints:
        # Mock SLA: 48 hours from created_at
        sla_hours = 48
        hours_elapsed = (now - c.created_at.replace(tzinfo=None)).total_seconds() / 3600 if c.created_at else 0
        sla_breached = hours_elapsed > sla_hours and c.status not in ["Resolved", "Action Taken"]
        
        results.append({
            "id": c.id,
            "violation_type": c.violation_type,
            "severity": c.severity,
            "status": c.status,
            "created_at": c.created_at,
            "sla_breached": sla_breached,
            "hours_elapsed": round(hours_elapsed, 1),
            "latitude": c.latitude,
            "longitude": c.longitude
        })
        
    return {
        "total": len(results),
        "high_priority": len([r for r in results if r["severity"] == "HIGH"]),
        "sla_breached_count": len([r for r in results if r["sla_breached"]]),
        "complaints": results
    }

@app.patch("/api/complaints/{complaint_id}/status")
def update_complaint_status(
    complaint_id: int,
    status: str = Form(...),
    remarks: str = Form(None),
    actor_id: int = Form(...), # Typically from JWT token
    db: Session = Depends(get_db)
):
    """
    Updates complaint status and logs the event for the audit trail.
    """
    complaint = db.query(models.Complaint).filter(models.Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    complaint.status = status
    db.commit()
    
    # Audit Trail
    event = models.ComplaintEvent(
        complaint_id=complaint_id,
        status=status,
        actor_id=actor_id,
        remarks=remarks
    )
    db.add(event)
    db.commit()
    
    return {"message": "Status updated", "new_status": status}

@app.get("/api/heatmap")
def get_heatmap_data(db: Session = Depends(get_db)):
    """
    Returns generalized coordinates and violation categories for the public heatmap.
    Personal complainant data is omitted.
    """
    # Fetch complaints that are not completely resolved/fake
    complaints = db.query(models.Complaint).filter(
        models.Complaint.status != "Rejected"
    ).all()
    
    heatmap_points = []
    for c in complaints:
        if c.latitude and c.longitude:
            heatmap_points.append({
                "id": c.id,
                "latitude": c.latitude,
                "longitude": c.longitude,
                "violation_type": c.violation_type,
                "severity": c.severity
            })
            
    return {"data": heatmap_points}
