# test_gemini.py (robust; loads aws.env)
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

# load local aws.env (same folder)
load_dotenv("aws.env")

print("GEMINI_API_KEY present:", bool(os.getenv("GEMINI_API_KEY")))
try:
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    cfg = types.GenerateContentConfig(response_mime_type="application/json")
    resp = client.models.generate_content(
        model=os.getenv("GEMINI_MODEL_NAME", "gemini-2.0-flash"),
        contents='{"ping":"pong"}',
        config=cfg
    )
    print("RESP TEXT (truncated):", getattr(resp, "text", str(resp))[:1000])
except Exception as e:
    print("GEMINI ERROR:", type(e).__name__, e)
