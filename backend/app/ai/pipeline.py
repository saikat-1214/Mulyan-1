from google import genai
from google.genai import types
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Gemini with the API Key from environment variable
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("WARNING: GEMINI_API_KEY not found in environment. AI scanning will fail.")

class AIPipeline:
    def __init__(self):
        print("Initializing Gemini AI Vision Pipeline...")
        self.client = genai.Client(api_key=api_key or "")
        print("Gemini AI Pipeline Ready.")

    def run(self, image_bytes: bytes) -> dict:
        """
        Executes the Gemini Vision pipeline on the input image bytes.
        Returns parsed structured data.
        """
        prompt = '''
        Analyze this product packaging label. Extract the following compliance details for Indian Legal Metrology.
        Return ONLY a valid JSON object with no markdown formatting, no backticks, and no explanation.
        If a field is not found, set its value to null.
        Format:
        {
            "mrp": (float or null, extract only the numerical value),
            "expiry_date": (string or null, e.g. "05/2027" or "6 Months from Mfg"),
            "net_quantity": (string or null, e.g. "200g" or "1 L"),
            "batch_no": (string or null, e.g. "BCH-123")
        }
        '''
        
        try:
            response = self.client.models.generate_content(
                model='gemini-1.5-flash',
                contents=[
                    prompt,
                    types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")
                ]
            )
            
            text = response.text.strip()
            
            # Clean up markdown formatting if Gemini accidentally includes it
            if text.startswith('```json'):
                text = text[7:]
            elif text.startswith('```'):
                text = text[3:]
            if text.endswith('```'):
                text = text[:-3]
                
            parsed_data = json.loads(text.strip())
            parsed_data["raw_text"] = ["Extracted via Gemini Vision 1.5"]
            return parsed_data
            
        except Exception as e:
            print("Gemini Extraction Error:", e)
            return {
                "mrp": None,
                "expiry_date": None,
                "net_quantity": None,
                "batch_no": None,
                "raw_text": [str(e)]
            }
