from datetime import datetime
from typing import Dict, Any, List

class ComplianceEngine:
    """
    Evaluates parsed product data against Legal Metrology Rules.
    Returns a list of potential violations.
    """
    def __init__(self):
        pass

    def evaluate(self, parsed_data: Dict[str, Any], selling_price: float = None) -> List[Dict[str, Any]]:
        violations = []
        
        # Check 1: MRP Violation
        mrp = parsed_data.get("mrp")
        if mrp and selling_price:
            if selling_price > mrp:
                violations.append({
                    "type": "OVERCHARGING",
                    "severity": "HIGH",
                    "message": f"Selling price (Rs {selling_price}) exceeds printed MRP (Rs {mrp})"
                })
                
        # Check 2: Expired Product
        expiry_date = parsed_data.get("expiry_date")
        if expiry_date:
            try:
                # Try common date formats: MM/YYYY, YYYY-MM, MM/YY, YYYY-MM-DD
                from dateutil import parser as dateparser
                parsed_expiry = dateparser.parse(expiry_date, dayfirst=False)
                if parsed_expiry and parsed_expiry < datetime.now():
                    violations.append({
                        "type": "EXPIRED_PRODUCT",
                        "severity": "HIGH",
                        "message": f"Product appears to be past expiry date ({expiry_date})"
                    })
            except Exception:
                # If we can't parse the date, skip the check
                pass
                
        # Check 3: Missing mandatory information
        missing_fields = []
        if not mrp:
            missing_fields.append("MRP")
        if not parsed_data.get("net_quantity"):
            missing_fields.append("Net Quantity")
        if not parsed_data.get("batch_no"):
            missing_fields.append("Batch Number")
            
        if missing_fields:
            violations.append({
                "type": "MISSING_DECLARATION",
                "severity": "MEDIUM",
                "message": f"Missing mandatory declarations: {', '.join(missing_fields)}"
            })
            
        return violations
