import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import api from "@/services/Api"
import {useNavigate} from "@tanstack/react-router"
import type { RegisterSchema } from "../../schemas/auth.schema"
import { toast } from "sonner"
import { isAxiosError } from "axios"

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: RegisterSchema) => {
      const { data } = await api.post("users/register/", credentials)
      const accessToken = data.access || data.token
      const refreshToken = data.refresh 
      const userData = data.user || data
      if (accessToken){
        localStorage.setItem("authtoken", accessToken)
      }
      if(refreshToken){
        localStorage.setItem("refreshToken", refreshToken)
      }
      return { user: userData, access: accessToken, refresh: refreshToken }
    },
    onSuccess: (data) => {
      setAuth(data.user, data.access, data.refresh)
      navigate({ to: "/" })
      toast.success("Registro exitoso", {
        description:`Bienvenido a la plataforma, ${data.user.username || "pana"}!`,
      })
    },
    onError: (error) => {
      let message = "Error al registrarse. Intente de nuevo."

      if (isAxiosError(error)) {
        const data = error.response?.data
        if (typeof data?.detail === "string") {
          message = data.detail
        } else if (Array.isArray(data?.username)) {
          message = data.username[0]
        }else if (Array.isArray(data?.email)) {
          message = data.email[0]
        }
      }

      toast.error(message)
    },
  })
}
