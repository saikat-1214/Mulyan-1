from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Jurisdiction, Officer

class GeoRouter:
    @staticmethod
    def find_jurisdiction(db: Session, latitude: float, longitude: float):
        """
        Uses PostGIS ST_Contains to perform a Point-in-Polygon spatial query.
        Finds which jurisdiction boundary contains the consumer's coordinates.
        """
        # Create a PostGIS point from the lat/long (Note: PostGIS uses Longitude, Latitude)
        point = f"SRID=4326;POINT({longitude} {latitude})"
        
        # Query the database for a jurisdiction whose polygon contains the point
        jurisdiction = db.query(Jurisdiction).filter(
            func.ST_Contains(Jurisdiction.boundary_geometry, func.ST_GeomFromText(point))
        ).first()
        
        if jurisdiction:
            # Fetch the assigned officer
            officer = db.query(Officer).filter(Officer.jurisdiction_id == jurisdiction.id).first()
            return jurisdiction, officer
            
        return None, None
