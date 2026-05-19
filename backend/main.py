from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from ai_service import analyze

app = FastAPI()


app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


class Input(BaseModel):
    prompt: str


@app.get("/")
def home():

    return {
        "message":
        "Backend Running"
    }


@app.post("/analyze")
def run(data: Input):

    result = analyze(
        data.prompt
    )

    return result