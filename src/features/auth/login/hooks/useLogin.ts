import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import api from "@/services/Api"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import type { User } from "../../types"
// 1. Importamos el tipo estrictamente generado por Zod v4
import type { LoginSchema } from "../../schemas/auth.schema"

interface TokenResponse {
  access: string
  refresh: string
}

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  return useMutation({
    // Tipamos el argumento con el esquema inferido de Zod v4
    mutationFn: async (credentials: LoginSchema) => {
      // Paso 1: Obtener tokens de SimpleJWT en Django
      // Mapeamos 'email' a 'username' porque Django utiliza USERNAME_FIELD internamente
      const { data: tokens } = await api.post<TokenResponse>("token/", {
        username: credentials.username,
        password: credentials.password,
      })

      // Paso 2: Persistir los tokens en el almacenamiento local de forma inmediata
      localStorage.setItem("authtoken", tokens.access)
      localStorage.setItem("refreshtoken", tokens.refresh)

      // Paso 3: Consultar el perfil del usuario autenticado
      const { data: users } = await api.get<{ results: User[] }>("users/",{
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      })
      const user = users.results[0]

      // Retornamos el objeto unificado con la información del usuario y sus tokens
      return { ...user, access: tokens.access, refresh: tokens.refresh }
    },
    onSuccess: (data) => {
      // Guardamos el estado global en Zustand
      setAuth(data)

      // Redirección segura mediante TanStack Router
      navigate({ to: "/" })

      // Notificación visual de éxito al usuario
      toast.success("Inicio de sesión exitoso", {
        description: `Bienvenido, ${data.first_name || data.username}`,
      })
    },
    onError: (error) => {
      let message = "Vuelva a intentar. Credenciales incorrectas."

      if (isAxiosError(error)) {
        const data = error.response?.data
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

      // Mostramos la alerta de error controlada
      toast.error(message)
    },
  })
}
