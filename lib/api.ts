import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

/**
 * Axios instance for all API calls.
 *
 * Base URL uses Next.js rewrites (/api/* → http://localhost:8080/api/*)
 * so no CORS issues in dev — all requests go through Next.js server.
 *
 * withCredentials: true — required for httpOnly cookies (JWT + reg_session)
 * to be sent and received cross-origin.
 */
const api = axios.create({
  baseURL: '',           // empty — uses Next.js rewrites
  withCredentials: true, // send/receive httpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// ── Request interceptor ────────────────────────────────────────────────────

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// ── Response interceptor ───────────────────────────────────────────────────

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status
    const message = error.response?.data?.message || 'Something went wrong'

    // 401 — not logged in (don't show toast, let component handle redirect)
    if (status === 401) {
      return Promise.reject(error)
    }

    // 403 — forbidden
    if (status === 403) {
      toast.error('You do not have permission to perform this action')
      return Promise.reject(error)
    }

    // 429 — rate limited
    if (status === 429) {
      toast.error('Too many requests. Please try again later.')
      return Promise.reject(error)
    }

    // 500 — server error
    if (status === 500) {
      toast.error('Server error. Please try again.')
      return Promise.reject(error)
    }

    // All other errors — return for component to handle
    return Promise.reject(error)
  }
)

export default api

// ── Typed API helpers ──────────────────────────────────────────────────────

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'Something went wrong'
  }
  return 'Something went wrong'
}