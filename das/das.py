"""
das.py (updated)

Minimal DAS with:
 - list objects
 - fetch objects
 - presign URLs
 - NEW: /analyze -> AI analytics using Gemini Developer API

Run:
   pip install fastapi uvicorn boto3 python-dotenv google-genai jsonschema
   python -m uvicorn das:app --reload --host 0.0.0.0 --port 8000
"""

import os
import json
import csv
import io
import hashlib
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import StreamingResponse, JSONResponse
import boto3
from botocore.exceptions import ClientError

# Gemini SDK + jsonschema
from google import genai
from google.genai import types
from jsonschema import validate as jsonschema_validate, ValidationError

# ---------------------------------------------------------
# Load environment from aws.env
# ---------------------------------------------------------
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "aws.env"))

AWS_REGION = os.getenv("AWS_REGION") or "ap-south-1"
S3_BUCKET = os.getenv("S3_BUCKET")
S3_PREFIX = os.getenv("S3_PREFIX", "")
MAX_LIST_KEYS = int(os.getenv("MAX_LIST_KEYS", "100"))
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", str(1024 * 1024)))

# Gemini API (Developer API version, no GCP project required)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL_NAME = os.getenv("GEMINI_MODEL_NAME", "gemini-2.0-flash")

if not S3_BUCKET:
    raise RuntimeError("S3_BUCKET must be set in aws.env")

# ---------------------------------------------------------
# Create S3 client
# ---------------------------------------------------------
session = boto3.Session(region_name=AWS_REGION)
s3 = session.client("s3")

app = FastAPI(title="S3 Data Access Server (DAS) with Gemini AI")

# ---------------------------------------------------------
# Helpers for S3 path normalization
# ---------------------------------------------------------
def full_prefix(prefix: Optional[str]) -> str:
    if not prefix:
        return S3_PREFIX if not S3_PREFIX.endswith("/") else S3_PREFIX
    kk = prefix.lstrip("/")
    if S3_PREFIX and kk.startswith(S3_PREFIX):
        out = kk
    else:
        out = f"{S3_PREFIX}{kk}" if S3_PREFIX else kk
    return out if out.endswith("/") else f"{out}/"

def full_key(key: str) -> str:
    if not key:
        return key
    kk = key.lstrip("/")
    if S3_PREFIX and kk.startswith(S3_PREFIX):
        return kk
    return f"{S3_PREFIX}{kk}" if S3_PREFIX else kk

# ---------------------------------------------------------
# LIST ENDPOINT (same as before)
# ---------------------------------------------------------
@app.get("/list")
def list_objects(
    prefix: Optional[str] = Query("", description="directory/prefix under S3_PREFIX to list"),
    ext: Optional[str] = Query(None),
    recursive: bool = Query(False),
    max_keys: int = Query(MAX_LIST_KEYS),
    continuation_token: Optional[str] = Query(None),
):
    query_prefix = full_prefix(prefix)

    allowed_exts = None
    if ext:
        parts = [p.strip().lower().lstrip(".") for p in ext.split(",")]
        allowed_exts = set(parts)

    if not recursive:
        try:
            resp = s3.list_objects_v2(
                Bucket=S3_BUCKET,
                Prefix=query_prefix,
                Delimiter="/",
                MaxKeys=max_keys
            )
        except ClientError as e:
            raise HTTPException(500, f"S3 error: {e}")

        folders = [x["Prefix"] for x in resp.get("CommonPrefixes", [])]
        files = []
        for obj in resp.get("Contents", []):
            key = obj["Key"]
            if key == query_prefix:
                continue
            if allowed_exts:
                file_ext = key.lower().rsplit(".", 1)[-1]
                if file_ext not in allowed_exts:
                    continue
            files.append({
                "key": key,
                "size": obj["Size"],
                "last_modified": obj["LastModified"].isoformat()
            })

        return {
            "prefix": query_prefix,
            "folders": folders,
            "files": files,
            "is_truncated": resp.get("IsTruncated", False),
            "next_token": resp.get("NextContinuationToken")
        }

    # recursive listing
    paginator = s3.get_paginator("list_objects_v2")
    params = {"Bucket": S3_BUCKET, "Prefix": query_prefix, "MaxKeys": max_keys}
    if continuation_token:
        params["ContinuationToken"] = continuation_token

    output_files = []
    for page in paginator.paginate(**params):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            if key == query_prefix:
                continue
            if allowed_exts:
                file_ext = key.lower().rsplit(".", 1)[-1]
                if file_ext not in allowed_exts:
                    continue
            output_files.append({
                "key": key,
                "size": obj["Size"],
                "last_modified": obj["LastModified"].isoformat()
            })

        return {
            "prefix": query_prefix,
            "files": output_files,
            "is_truncated": page.get("IsTruncated", False),
            "next_token": page.get("NextContinuationToken")
        }

# ---------------------------------------------------------
# FETCH endpoint
# ---------------------------------------------------------
@app.get("/fetch")
def fetch_object(key: str):
    k = full_key(key)
    try:
        obj = s3.get_object(Bucket=S3_BUCKET, Key=k)
    except ClientError as e:
        raise HTTPException(404, f"Object not found: {k}")

    body = obj["Body"]
    content_type = obj.get("ContentType", "application/octet-stream")

    def iterfile():
        try:
            for chunk in iter(lambda: body.read(CHUNK_SIZE), b""):
                yield chunk
        finally:
            body.close()

    return StreamingResponse(iterfile(), media_type=content_type)

# ---------------------------------------------------------
# PRESIGNED URL endpoint
# ---------------------------------------------------------
@app.get("/presigned")
def presigned_get(key: str, expires: int = 300):
    k = full_key(key)
    try:
        url = s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": S3_BUCKET, "Key": k},
            ExpiresIn=expires
        )
    except ClientError as e:
        raise HTTPException(500, f"Presign failed: {e}")

    return {"url": url, "expires_in": expires}

# ---------------------------------------------------------
# HEALTH
# ---------------------------------------------------------
@app.get("/health")
def health():
    return {"status": "ok"}

# ---------------------------------------------------------
# -----------  GEMINI ANALYTICS SECTION  -----------------
# ---------------------------------------------------------

_GEMINI_SCHEMA = {
    "type": "object",
    "properties": {
        "summary": {"type": "string"},
        "row_count": {"type": ["integer", "null"]},
        "column_stats": {"type": "array"},
        "top_correlations": {"type": "array"},
        "missing_values": {"type": "array"},
        "anomalies": {"type": "array"},
        "recommended_visualizations": {"type": "array"},
        "next_steps": {"type": "array"}
    },
    "required": ["summary", "column_stats"]
}

_ANALYSIS_CACHE: Dict[str, Any] = {}

def _cache_key(s: str) -> str:
    return hashlib.sha256(s.encode()).hexdigest()

# Build metadata by automatically inspecting a CSV or text file
def _metadata_from_s3_bytes(key: str, data: bytes) -> Dict[str, Any]:
    meta = {
        "dataset_id": key,
        "columns": [],
        "rows": None,
        "sample_preview": [],
        "target_questions": ["Give a concise dataset summary."]
    }

    try:
        text = data.decode("utf-8")
    except:
        text = data.decode("latin-1", errors="ignore")

    preview = text[:3000]

    # Detect CSV
    if "," in preview and "\n" in preview:
        reader = csv.reader(io.StringIO(preview))
        rows = list(reader)
        if rows:
            header = rows[0]
            meta["columns"] = [{"name": h, "type": "unknown"} for h in header]

            # extract up to 10 full rows
            full_reader = csv.DictReader(io.StringIO(text))
            sample = []
            for i, r in enumerate(full_reader):
                if i >= 10:
                    break
                sample.append(r)
            meta["sample_preview"] = sample
        return meta

    # Otherwise plain text
    meta["columns"] = [{"name": "text", "type": "string"}]
    meta["sample_preview"] = [{"text_snippet": preview[:1000]}]
    return meta

def _build_prompt(metadata):
    system = (
        "You are a data analyst. OUTPUT ONLY JSON matching the given schema. "
        "Do not output any extra commentary."
    )
    sample = json.dumps(metadata["sample_preview"])[:1200]
    user = (
        f"METADATA: {json.dumps(metadata)}\n"
        f"SAMPLE_PREVIEW: {sample}\n"
        f"SCHEMA: {json.dumps(_GEMINI_SCHEMA)}"
    )
    return system + "\n\n" + user

def _call_gemini(prompt: str):
    if not GEMINI_API_KEY:
        # raise a RuntimeError or return a helpful JSON/exception before calling genai
        raise RuntimeError("GEMINI_API_KEY not found. Put GEMINI_API_KEY in aws.env or environment and restart the server.")
    client = genai.Client(api_key=GEMINI_API_KEY)
    config = types.GenerateContentConfig(response_mime_type="application/json")
    response = client.models.generate_content(
        model=GEMINI_MODEL_NAME,
        contents=prompt,
        config=config
    )
    return getattr(response, "text", str(response))




@app.get("/analyze")
def analyze(key: str):
    """
    Auto-fetch the S3 file, build metadata, send to Gemini,
    validate JSON, and return the AI analysis.
    """
    k = full_key(key)
    cache_id = _cache_key(k)

    if cache_id in _ANALYSIS_CACHE:
        return {"ok": True, "analysis": _ANALYSIS_CACHE[cache_id], "cached": True}

    try:
        obj = s3.get_object(Bucket=S3_BUCKET, Key=k)
    except ClientError:
        raise HTTPException(404, f"S3 key not found: {k}")

    # read first 128 KB
    data = obj["Body"].read(128 * 1024)

    metadata = _metadata_from_s3_bytes(k, data)
    prompt = _build_prompt(metadata)

    raw = _call_gemini(prompt)

    try:
        parsed = json.loads(raw)
    except:
        return {"ok": False, "error": "Model returned non-JSON", "raw_output": raw}

    try:
        jsonschema_validate(parsed, _GEMINI_SCHEMA)
    except ValidationError as e:
        return {"ok": False, "error": "Schema validation failed", "details": str(e), "parsed": parsed}

    _ANALYSIS_CACHE[cache_id] = parsed

    return {"ok": True, "analysis": parsed, "cached": False}
