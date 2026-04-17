import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import api from "@/services/Api"
import type { LoginSchema } from "../../schemas/auth.schema"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { isAxiosError } from "axios"

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: LoginSchema) => {
      const { data } = await api.post("users/login/", credentials)
      return data
    },
    onSuccess: (data) => {
      setAuth(data)
      navigate({ to: "/" })
    },
    onError: (error) => {
      let message = "Vuelva a intentar. Credenciales incorrectas."

      if (isAxiosError(error)) {
        const data = error.response?.data
        // Django puede devolver el error como:
        // { detail: "..." } o { non_field_errors: ["..."] } o { username: ["..."] }
        if (typeof data?.detail === "string") {
          message = data.detail
        } else if (Array.isArray(data?.non_field_errors)) {
          message = data.non_field_errors[0]
        } else if (error.response?.status === 401) {
          message = "Credenciales incorrectas. Vuelva a intentar."
        } else if (error.response?.status === 400) {
          message = "Datos inválidos. Revise los campos e intente de nuevo."
        }
      }

      toast.error(message)
    },
  })
}
