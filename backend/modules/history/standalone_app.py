"""
Standalone FastAPI app for Report History module — port 8001.
Does not modify main.py or existing /analyze API.
"""

from __future__ import annotations

import sys
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure backend/ is on sys.path when run as script
BACKEND_ROOT = Path(__file__).resolve().parent.parent.parent
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from modules.history.models.history_model import init_db  # noqa: E402
from modules.history.routes.history_routes import router  # noqa: E402
from modules.history.seed_sample_data import seed_if_empty  # noqa: E402


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    inserted = seed_if_empty()
    if inserted:
        print(f"[history] Seeded {inserted} demo report(s) (target: 18).")
    yield


app = FastAPI(
    title="HireInsight — Report History API",
    description="Standalone history module (not integrated with main app yet).",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/history")


@app.get("/")
def root():
    return {
        "message": "HireInsight Report History API",
        "docs": "/docs",
        "history_base": "/history/reports",
    }


@app.get("/health")
def health():
    return {"status": "ok", "module": "history"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "modules.history.standalone_app:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
    )
