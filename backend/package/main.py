from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from dictionary import lookup_term, lookup_court
from mangum import Mangum
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# ── Request models ──────────────────────────────────────────
class TermRequest(BaseModel):
    term: str


class DocumentRequest(BaseModel):
    text: str
    language: str = "en"  # "en" or "ko" (UI language, not content)


# ── Term lookup endpoint ─────────────────────────────────────
@app.post("/translate/term")
async def translate_term(req: TermRequest):
    term = req.term.strip()

    # 1. Check dictionary first
    dictionary_result = lookup_term(term)

    # 2. Always get AI result for comparison
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
    except Exception as e:
        ai_result = None

    return {
        "term": term,
        "dictionary": dictionary_result,
        "ai": ai_result,
        "source": "dictionary" if dictionary_result else "ai_only",
    }


# ── Document translation endpoint ────────────────────────────
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

        # Flag uncertain terms
        uncertain_terms = []
        import re
        matches = re.findall(r'\[UNCERTAIN: (.*?)\]', translated)
        uncertain_terms = matches

        return {
            "original": text,
            "translation": translated,
            "uncertain_terms": uncertain_terms,
        }

    except Exception as e:
        return {"error": str(e)}


# ── Health check ─────────────────────────────────────────────
@app.get("/health")
async def health():
    return {"status": "ok"}


# ── AWS Lambda handler ───────────────────────────────────────
handler = Mangum(app)
