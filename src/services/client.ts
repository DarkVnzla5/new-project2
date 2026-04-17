import axios, { type AxiosInstance } from "axios"

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
export const API_BASE_URL = `${BASE_URL}/api/`

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})
function handleLogout() {
  localStorage.removeItem("authtoken")
  localStorage.removeItem("refreshtoken")
  localStorage.removeItem("user")
  window.location.href = "/login"
}

// --- Interceptor de Petición ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authtoken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

// --- Interceptor de Respuesta ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem("refreshtoken")

      if (!refreshToken) {
        handleLogout()
        return Promise.reject(error)
      }

      try {
        const { data } = await axios.post(`${API_BASE_URL}token/refresh/`, {
          refresh: refreshToken,
        })

        localStorage.setItem("authtoken", data.access)
        originalRequest.headers.Authorization = `Bearer ${data.access}`

        processQueue(null, data.access)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        handleLogout()
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api
