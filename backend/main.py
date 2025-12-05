# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow the frontend origin while developing (adjust port if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VizRequest(BaseModel):
    start_date: str
    end_date: str
    x_axis: str
    y_axes: List[str]
    x_label: Optional[str] = None
    y_labels: Optional[List[str]] = None
    time_range: Optional[str] = None

@app.post("/api/visualize")
async def visualize(req: VizRequest):
    # --- Example behavior: return mock time-series data based on y_axes ---
    # Usually here you would query a database or read a file and aggregate values.
    # For demo we produce a simple payload matching what VisualizationTool expects.

    # Example x axis (two points: start and end)
    x = [req.start_date, req.end_date]

    # Build a series for each requested y_axis (mock numbers)
    series = []
    for i, y in enumerate(req.y_axes):
        # simple mock values, create two numbers so the frontend preview is intuitive
        series.append({
            "name": y,                          # backend field name (e.g. "sst")
            "label": (req.y_labels[i] if req.y_labels and i < len(req.y_labels) else y),
            "values": [round(1 + i * 0.5, 2), round(2 + i * 0.5, 2)]
        })

    payload = {
        "x": x,
        "series": series
    }

    return {"status": "ok", "payload": payload}
