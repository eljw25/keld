import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: BASE_URL })

export async function translateTerm(term) {
  const { data } = await api.post('/translate/term', { term })
  return data
}

export async function translateDocument(text) {
  const { data } = await api.post('/translate/document', { text })
  return data
}
