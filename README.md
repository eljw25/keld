# KELD — Korean-English Legal Dictionary

A translation tool for Korean legal documents. Combines a curated dictionary of 160+ verified legal terms with GPT-3.5-turbo for terms outside the dictionary.

**Live:** https://keld.vercel.app

---

## Features

- **Document Translation** — paste a full Korean legal record, get a complete English translation with uncertain terms flagged for review
- **Term Reference** — look up a single Korean legal term, dictionary result vs AI side by side
- **Dictionary-first** — common terms never hit the API, keeping costs near zero

## Stack

- **Frontend:** React + Vite → Vercel
- **Backend:** Python + FastAPI → AWS Lambda
- **Gateway:** AWS API Gateway
- **AI:** OpenAI GPT-3.5-turbo
- **Adapter:** Mangum (Lambda ↔ FastAPI)

## Running Locally

**Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Create `backend/.env`:
```
OPENAI_API_KEY=your_key_here
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:8000
```

More about this project: [Portfolio](https://jwericlee.vercel.app)
