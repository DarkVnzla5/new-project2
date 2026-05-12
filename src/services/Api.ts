import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios"
import { useAuthStore } from "@/features/auth/store/useAuthStore"

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
// Eliminamos la barra final si existe para evitar el doble // al concatenar
const normalizedBaseUrl = BASE_URL.endsWith("/")
  ? BASE_URL.slice(0, -1)
  : BASE_URL
export const API_BASE_URL = `${normalizedBaseUrl}/api/`

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

/**
 * Función centralizada de logout que limpia el storage,
 * actualiza el estado de Zustand y redirige.
 */
export const handleLogout = () => {
  localStorage.removeItem("authtoken")
  localStorage.removeItem("refreshtoken")
  localStorage.removeItem("user")

  // Actualizamos el store de Zustand para que la UI reaccione
  useAuthStore.getState().logout()

  if (typeof window !== "undefined") {
    window.location.href = "/login"
  }
}

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

interface RefreshResponse {
  access: string
}

// --- Interceptor de Respuesta ---
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // 401 Unauthorized: Intentamos refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
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
        // Usamos la instancia base de axios para evitar interceptores en el refresh
        const { data } = await axios.post<RefreshResponse>(
          `${API_BASE_URL}token/refresh/`,
          {
            refresh: refreshToken,
          },
        )

        const newAccessToken = data.access
        localStorage.setItem("authtoken", newAccessToken)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        }

        processQueue(null, newAccessToken)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        console.error("Error al refrescar el token:", refreshError)
        handleLogout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api
