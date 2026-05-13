import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import api from "@/services/Api"
import type { RegisterSchema } from "../../schemas/auth.schema"
import { toast } from "sonner"
import { isAxiosError } from "axios"

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async (credentials: RegisterSchema) => {
      const { data } = await api.post("users/register/", credentials)
      return data
    },
    onSuccess: (data) => {
      setAuth(data)
      toast.success("Registro exitoso", {
        description: "Bienvenido a la plataforma",
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
        }
      }

      toast.error(message)
    },
  })
}
