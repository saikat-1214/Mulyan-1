import cv2
import numpy as np
from typing import List, Dict, Any

class RegionDetector:
    def __init__(self, model_path: str = None):
        """
        Initializes the YOLOv8 model. 
        For the hackathon MVP, if a model path is not provided, 
        it falls back to a simulated region detector that returns the full image 
        or naive regions, allowing the OCR to process it.
        """
        self.model_path = model_path
        if model_path:
            from ultralytics import YOLO
            self.model = YOLO(model_path)
        else:
            self.model = None

    def detect_regions(self, image: np.ndarray) -> List[Dict[str, Any]]:
        """
        Returns a list of detected regions.
        Format: {"label": "mrp_region", "bbox": [x1, y1, x2, y2], "crop": np.ndarray}
        """
        regions = []
        
        if self.model:
            results = self.model(image)
            for result in results:
                boxes = result.boxes
                for box in boxes:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    conf = float(box.conf[0])
                    cls_id = int(box.cls[0])
                    label = self.model.names[cls_id]
                    
                    crop = image[y1:y2, x1:x2]
                    regions.append({
                        "label": label,
                        "bbox": [x1, y1, x2, y2],
                        "confidence": conf,
                        "crop": crop
                    })
        else:
            # MVP Fallback: Return the entire image as a "full_label" region
            h, w = image.shape[:2]
            regions.append({
                "label": "full_label",
                "bbox": [0, 0, w, h],
                "confidence": 1.0,
                "crop": image
            })
            
        return regions
