import cv2
import numpy as np
from typing import Tuple

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Decodes the uploaded image bytes into an OpenCV image and applies preprocessing
    such as resizing, noise reduction, and contrast enhancement.
    """
    np_arr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    
    if image is None:
        raise ValueError("Could not decode image")
        
    # Resize if too large to speed up inference while maintaining aspect ratio
    max_dim = 1024
    h, w = image.shape[:2]
    if max(h, w) > max_dim:
        scale = max_dim / max(h, w)
        image = cv2.resize(image, (int(w * scale), int(h * scale)))
        
    # Optional: Enhance contrast for better OCR (CLAHE)
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    limg = cv2.merge((cl, a, b))
    enhanced = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
    
    return enhanced
