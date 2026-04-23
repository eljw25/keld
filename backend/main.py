from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from dictionary import lookup_term
from mangum import Mangum
import os
import re

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://keld.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class TermRequest(BaseModel):
    term: str


class DocumentRequest(BaseModel):
    text: str


@app.post("/translate/term")
async def translate_term(req: TermRequest):
    term = req.term.strip()
    dictionary_result = lookup_term(term)

    ai_result = None
    if not dictionary_result:
        try:
            system_prompt = (
                "You are a Korean legal terminology expert specializing in criminal law. "
                "Translate the given Korean legal term to English accurately. "
                "Preserve the legal meaning precisely. "
                "Return only the English translation, nothing else."
            )
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Translate this Korean legal term: {term}"},
                ],
                max_tokens=150,
                temperature=0.1,
            )
            ai_result = response.choices[0].message.content.strip()
        except Exception:
            ai_result = None

    return {
        "term": term,
        "dictionary": dictionary_result,
        "ai": ai_result,
        "source": "dictionary" if dictionary_result else "ai_only",
    }


@app.post("/translate/document")
async def translate_document(req: DocumentRequest):
    text = req.text.strip()

    if not text:
        return {"error": "No text provided"}

    try:
        system_prompt = (
            "You are a Korean legal document translator specializing in criminal records. "
            "Translate the provided Korean legal text to English accurately. "
            "Preserve all legal terminology, names, dates, court names, and case numbers exactly. "
            "For legal terms, use formal English legal equivalents. "
            "Format the output clearly with proper structure. "
            "Flag any terms you are uncertain about by wrapping them in [UNCERTAIN: term]."
        )

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": text},
            ],
            max_tokens=2000,
            temperature=0.1,
        )

        translated = response.choices[0].message.content.strip()
        uncertain_terms = re.findall(r'\[UNCERTAIN: (.*?)\]', translated)

        return {
            "original": text,
            "translation": translated,
            "uncertain_terms": uncertain_terms,
        }

    except Exception as e:
        return {"error": str(e)}


@app.get("/health")
async def health():
    return {"status": "ok"}


handler = Mangum(app)
