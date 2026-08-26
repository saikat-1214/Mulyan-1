import re
from typing import List, Dict, Any

class TextParser:
    """
    Parses OCR extracted text to find relevant Legal Metrology fields:
    MRP, Net Quantity, Expiry/Best Before, Batch No.
    """
    def __init__(self):
        # Patterns for MRP: e.g., "MRP Rs. 40", "MRP: 40.00", "Maximum Retail Price 40"
        self.mrp_patterns = [
            r'MRP\s*[:\.]?\s*(?:Rs\.?|₹)?\s*(\d+(?:\.\d{1,2})?)',
            r'(?:Rs\.?|₹)\s*(\d+(?:\.\d{1,2})?)',
            r'PRICE\s*[:\.]?\s*(?:Rs\.?|₹)?\s*(\d+(?:\.\d{1,2})?)'
        ]
        
        # Patterns for Expiry: e.g., "EXP 12/25", "Best before 6 months", "Expiry Date 2026-05"
        self.expiry_patterns = [
            r'EXP(?:IRY)?\s*DATE\s*[:\.]?\s*([\w\-\/]+)',
            r'BEST\s*BEFORE\s*[:\.]?\s*(.*)',
            r'EXP\s*[:\.]?\s*([\d\/\-]+)'
        ]
        
        # Patterns for Net Quantity: e.g., "Net Wt. 200g", "200 g", "Net Vol. 1 L"
        self.qty_patterns = [
            r'NET\s*(?:WT|WEIGHT|VOL|VOLUME)?\s*[:\.]?\s*(\d+(?:\.\d+)?\s*[a-zA-Z]+)',
            r'(\d+(?:\.\d+)?\s*(?:g|kg|ml|l|grams|liter))'
        ]
        
        # Patterns for Batch: e.g., "Batch No: B123", "B. No. 123"
        self.batch_patterns = [
            r'BATCH\s*(?:NO|CODE)?\s*[:\.]?\s*([A-Za-z0-9\-]+)',
            r'B\.\s*NO\.\s*([A-Za-z0-9\-]+)'
        ]

    def _extract_field(self, text_lines: List[str], patterns: List[str], clean: bool = True) -> Any:
        for line in text_lines:
            upper_line = line.upper() if clean else line
            for pattern in patterns:
                match = re.search(pattern, upper_line, re.IGNORECASE)
                if match:
                    return match.group(1).strip()
        return None

    def parse(self, text_lines: List[str]) -> Dict[str, Any]:
        """
        Takes raw text lines from OCR and returns a structured dictionary.
        """
        parsed_data = {
            "mrp": None,
            "expiry_date": None,
            "net_quantity": None,
            "batch_no": None,
            "raw_text": text_lines
        }
        
        # Parse MRP
        mrp_str = self._extract_field(text_lines, self.mrp_patterns)
        if mrp_str:
            try:
                parsed_data["mrp"] = float(mrp_str)
            except ValueError:
                pass
                
        # Parse Expiry
        parsed_data["expiry_date"] = self._extract_field(text_lines, self.expiry_patterns)
        
        # Parse Quantity
        parsed_data["net_quantity"] = self._extract_field(text_lines, self.qty_patterns)
        
        # Parse Batch
        parsed_data["batch_no"] = self._extract_field(text_lines, self.batch_patterns)
        
        return parsed_data
