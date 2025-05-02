import axios from 'axios'

const BASE_URL = 'https://note-sigma-black.vercel.app/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken')
    if (token && !config.url.includes('signIn') && !config.url.includes('signUp')) {
      config.headers.token = `3b8ny__${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Auth API
export const loginUser = async (userData) => {
  try {
    const { data } = await api.post('/users/signIn', userData)
    return data
  } catch (error) {
    throw error
  }
}

export const registerUser = async (userData) => {
  try {
    const { data } = await api.post('/users/signUp', userData)
    return data
  } catch (error) {
    throw error
  }
}

// Notes API
export const getNotes = async () => {
  try {
    const { data } = await api.get('/notes')
    return data.notes
  } catch (error) {
    throw error
  }
}

export const createNote = async (noteData) => {
  try {
    const { data } = await api.post('/notes', noteData)
    return data
  } catch (error) {
    throw error
  }
}

export const updateNote = async (noteId, noteData) => {
  try {
    const { data } = await api.put(`/notes/${noteId}`, noteData)
    return data
  } catch (error) {
    throw error
  }
}

export const deleteNote = async (noteId) => {
  try {
    const { data } = await api.delete(`/notes/${noteId}`)
    return data
  } catch (error) {
    throw error
  }
}

export default api