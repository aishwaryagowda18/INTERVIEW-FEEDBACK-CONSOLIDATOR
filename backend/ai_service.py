import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")


def analyze(prompt):

    if not API_KEY:

        raise Exception(
            "Missing GROQ_API_KEY in backend/.env"
        )


    response = requests.post(

        "https://api.groq.com/openai/v1/chat/completions",

        headers={

            "Authorization":
            f"Bearer {API_KEY}",

            "Content-Type":
            "application/json"

        },

        json={

            "model":
            "llama-3.3-70b-versatile",

            "messages":[
                {
                    "role":"user",

                    "content":
                    prompt
                }
            ],

            "temperature":
            0.4

        },

        timeout=60

    )


    if response.status_code != 200:

        raise Exception(

            f"Groq Error: "

            f"{response.status_code}"

            f" - "

            f"{response.text}"

        )


    return response.json()