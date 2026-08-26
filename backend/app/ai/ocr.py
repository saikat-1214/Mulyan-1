import cv2
import numpy as np
import pytesseract
import sys

class OCREngine:
    def __init__(self, use_gpu: bool = False):
        """
        Initializes Tesseract OCR.
        Note: Tesseract must be installed on the system (e.g., via tesseract-ocr installer on Windows).
        """
        # If on Windows, you might need to point to the tesseract executable if it's not in PATH.
        # e.g., pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        if sys.platform == "win32":
            # Best-effort path, user might need to install and configure it
            pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

    def extract_text(self, image: np.ndarray) -> list:
        """
        Extracts text from the image using Tesseract.
        Returns a list of strings (lines of text detected).
        """
        try:
            # Convert BGR to RGB (Tesseract expects RGB)
            rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            
            # Extract string
            text = pytesseract.image_to_string(rgb_image)
            
            # Split by newlines and filter out empty strings
            extracted_lines = [line.strip() for line in text.split('\n') if line.strip()]
            return extracted_lines
        except Exception as e:
            print(f"OCR Error (Ensure Tesseract is installed on Windows): {e}")
            return []
