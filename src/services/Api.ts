import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios"

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
export const API_BASE_URL = `${BASE_URL}/api/`

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// --- Interceptor de Petición ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authtoken")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// --- Interceptor de Respuesta ---
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem("refreshtoken")

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}token/refresh/`, {
            refresh: refreshToken,
          })
          const newAccessToken = data.access
          localStorage.setItem("authtoken", newAccessToken)
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          }
          return api(originalRequest)
        } catch (refreshError) {
          console.error("Sesión expirada definitivamente")
          handleLogout()
          return Promise.reject(refreshError)
        }
      } else {
        handleLogout()
      }
    }
    return Promise.reject(error)
  },
)

const handleLogout = () => {
  localStorage.removeItem("authtoken")
  localStorage.removeItem("refreshtoken")
  if (typeof window !== "undefined") {
    window.location.href = "/login"
  }
}

export default api
