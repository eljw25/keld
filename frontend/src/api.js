// api.js — All calls to the FastAPI backend live here
// Using axios to make HTTP requests to our Python server

import axios from 'axios'

// Base URL — points to local backend in dev, AWS Lambda in production
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: BASE_URL })

// Translate a single Korean legal term
// Returns: { term, dictionary, ai, source }
export async function translateTerm(term) {
  const { data } = await api.post('/translate/term', { term })
  return data
}

// Translate a full Korean legal document
// Returns: { original, translation, uncertain_terms }
export async function translateDocument(text) {
  const { data } = await api.post('/translate/document', { text })
  return data
}
