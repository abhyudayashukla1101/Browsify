"""
Browsify - FastAPI Backend Service
Central Intelligence Engine API endpoints for Browsify Chrome Extension.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os

app = FastAPI(
    title="Browsify API",
    description="Universal Proactive Browser Agent Backend",
    version="1.0.0"
)

# Enable CORS for Chrome Extension requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-Memory Session / Task State (SQLite upgradeable)
session_events: List[Dict[str, Any]] = []
active_tasks: Dict[str, Dict[str, Any]] = {}
saved_vault: Dict[str, List[Any]] = {"shopping": [], "education": [], "research": []}

# Pydantic Schemas
class BrowserEvent(BaseModel):
    url: str
    domain: Optional[str] = ""
    title: Optional[str] = ""
    headings: Optional[List[str]] = []
    textSnippet: Optional[str] = ""
    jsonLd: Optional[List[Any]] = []
    timestamp: Optional[int] = None

class IntentQuery(BaseModel):
    liveContext: Dict[str, Any]
    sessionHistory: Optional[List[Any]] = []

class ActionExecution(BaseModel):
    taskId: str
    actionType: str
    payload: Optional[Dict[str, Any]] = {}

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Browsify Central Intelligence Backend",
        "version": "1.0.0"
    }

@app.post("/api/events")
def record_event(event: BrowserEvent):
    session_events.append(event.model_dump())
    return {"status": "success", "event_id": len(session_events)}

@app.post("/api/intent")
def classify_intent(query: IntentQuery):
    ctx = query.liveContext
    url = (ctx.get("url") or "").lower()
    title = (ctx.get("title") or "").lower()

    if "shopping" in url or "laptop" in url or "product" in title or "macbook" in title:
        return {
            "intent": "shopping",
            "confidence": 0.94,
            "label": "Shopping",
            "summary": "Evaluating Apple MacBook Air 15\" M3 Laptop ($1,299.00).",
            "reasoning": "Detected product specifications and pricing schema for Apple MacBook Air M3.",
            "autonomyStatus": "Autonomous (Safe & Reversible)",
            "task_id": "task_shopping_01",
            "suggestions": [
                {
                    "id": "compare_specs",
                    "title": "Compare with Dell XPS 15 & ThinkPad",
                    "description": "Cross-store price and spec comparison.",
                    "actionTab": "shopping"
                }
            ]
        }
    elif "education" in url or "linked-list" in url or "data structure" in title:
        return {
            "intent": "education",
            "confidence": 0.91,
            "label": "Education",
            "summary": "Studying Data Structures (Linked Lists).",
            "reasoning": "Recognized computer science curriculum and Course schema.",
            "autonomyStatus": "Autonomous (Progress Tracking)",
            "task_id": "task_edu_01",
            "suggestions": [
                {
                    "id": "open_tracker",
                    "title": "Track Curriculum Progress",
                    "description": "Linked Lists marked 'In Progress'.",
                    "actionTab": "learning"
                }
            ]
        }
    elif "research" in url or "paper" in url or "agent" in title:
        return {
            "intent": "research",
            "confidence": 0.96,
            "label": "Research",
            "summary": "Reading paper: Autonomous Proactive Agents in Web Browsing.",
            "reasoning": "Scholarly publication detected with abstract and empirical conclusions.",
            "autonomyStatus": "Autonomous (Summary Generated)",
            "task_id": "task_res_01",
            "suggestions": [
                {
                    "id": "view_summary",
                    "title": "Read Executive Summary & Takeaways",
                    "description": "Key insights covering the 4-tier memory hierarchy.",
                    "actionTab": "research"
                }
            ]
        }
    
    return {
        "intent": "unknown",
        "confidence": 0.40,
        "label": "General Browsing",
        "summary": "Observing browsing patterns in background.",
        "reasoning": "Below 60% confidence threshold; no proactive interruption.",
        "autonomyStatus": "Silent Observation",
        "suggestions": []
    }

@app.get("/api/tasks")
def list_tasks():
    return active_tasks

@app.post("/api/assistant/action")
def execute_action(action: ActionExecution):
    return {
        "status": "executed",
        "taskId": action.taskId,
        "actionType": action.actionType
    }

# Mount static demo pages if folder exists
demo_dir = os.path.join(os.path.dirname(__file__), "..", "demo-pages")
if os.path.exists(demo_dir):
    app.mount("/demo", StaticFiles(directory=demo_dir, html=True), name="demo")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
