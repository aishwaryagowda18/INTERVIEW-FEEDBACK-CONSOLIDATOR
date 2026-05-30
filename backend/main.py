from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from ai_service import analyze
from modules.history.models.history_model import init_db
from modules.history.routes.history_routes import router as history_router
from modules.history.seed_sample_data import seed_if_empty

app = FastAPI()


@app.on_event("startup")
def startup_history_db():
    init_db()
    seed_if_empty()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(history_router, prefix="/history")


class Input(BaseModel):
    prompt: str


@app.get("/")
def home():

    return {"message": "Backend Running"}


@app.post("/analyze")
def run(data: Input):

    result = analyze(data.prompt)

    return result
