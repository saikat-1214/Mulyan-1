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
            # Basic rudimentary check for MVP (assumes format like MM/YY or YYYY-MM)
            # A real implementation would parse the string to datetime and compare
            # Here we just mock the condition for demonstration
            if "2024" in expiry_date or "24" in expiry_date: # Assume expired for mock
                violations.append({
                    "type": "EXPIRED_PRODUCT",
                    "severity": "HIGH",
                    "message": f"Product appears to be past expiry date ({expiry_date})"
                })
                
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
