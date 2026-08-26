import hashlib
from datetime import datetime
import json

class EvidenceVault:
    @staticmethod
    def generate_hash(image_bytes: bytes, latitude: float, longitude: float, timestamp: str) -> str:
        """
        Creates a cryptographic SHA-256 hash combining the raw image bytes
        and the essential metadata (GPS + Time) to create a tamper-evident footprint.
        """
        # Create a canonical payload structure
        metadata = {
            "latitude": latitude,
            "longitude": longitude,
            "timestamp": timestamp
        }
        
        # Initialize hash
        sha256 = hashlib.sha256()
        
        # Update with image data
        sha256.update(image_bytes)
        
        # Update with metadata string
        metadata_str = json.dumps(metadata, sort_keys=True)
        sha256.update(metadata_str.encode('utf-8'))
        
        return sha256.hexdigest()

    @staticmethod
    def construct_evidence_id(db_id: int) -> str:
        """
        Generates a human-readable evidence ID.
        Example: EV-2026-000182
        """
        year = datetime.utcnow().year
        return f"EV-{year}-{db_id:06d}"
