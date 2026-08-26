from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from .database import Base
from geoalchemy2 import Geometry

class Role(str, enum.Enum):
    CONSUMER = "CONSUMER"
    LMO_OFFICER = "LMO_OFFICER"
    POLICE = "POLICE"
    SENIOR_OFFICER = "SENIOR_OFFICER"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone_email = Column(String, unique=True, index=True)
    role = Column(String, default=Role.CONSUMER.value)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    manufacturer = Column(String)
    mrp = Column(Float)
    net_quantity = Column(String)
    batch_no = Column(String)
    expiry_date = Column(String)

class Scan(Base):
    __tablename__ = "scans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    image_url = Column(String)
    ocr_text = Column(JSON)
    confidence = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Complaint(Base):
    __tablename__ = "complaints"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"), nullable=True)
    merchant_id = Column(Integer, nullable=True)
    violation_type = Column(String)
    severity = Column(String)
    status = Column(String, default="Filed")
    latitude = Column(Float)
    longitude = Column(Float)
    assigned_officer = Column(Integer, ForeignKey("officers.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    sla_deadline = Column(DateTime(timezone=True))

class Evidence(Base):
    __tablename__ = "evidence"
    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"))
    file_url = Column(String)
    sha256_hash = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    captured_at = Column(DateTime(timezone=True), server_default=func.now())

class Officer(Base):
    __tablename__ = "officers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    department = Column(String)
    jurisdiction_id = Column(Integer, ForeignKey("jurisdictions.id"), nullable=True)

class Jurisdiction(Base):
    __tablename__ = "jurisdictions"
    id = Column(Integer, primary_key=True, index=True)
    district = Column(String)
    boundary_geometry = Column(Geometry('POLYGON', srid=4326), nullable=True)
    officer_id = Column(Integer, nullable=True) # or backref from Officer

class ComplaintEvent(Base):
    __tablename__ = "complaint_events"
    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"))
    status = Column(String)
    actor_id = Column(Integer, ForeignKey("users.id"))
    remarks = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
