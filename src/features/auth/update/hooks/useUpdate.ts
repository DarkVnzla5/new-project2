import { useMutation } from "@tanstack/react-query"
import api from "@/services/Api"
import { useAuthStore } from "../../store/useAuthStore"
import type { User } from "../../types"
import { toast } from "sonner"
import { isAxiosError } from "axios"

interface UpdateProfileData {
  first_name?: string
  last_name?: string
  email?: string
  avatar?: File | null
}

export const useUpdate = () => {
  const { user, setAuth } = useAuthStore()

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string | Blob)
        }
      })
      const { data: updatedUser } = await api.patch<User>(
        `users/${user?.id}/`,
        formData,
      )
      return updatedUser
    },
    onSuccess: (updatedUser) => {
      if (user) {
        setAuth({ ...user, ...updatedUser })
      }
      toast.success("Perfil actualizado")
    },
    onError: (error) => {
      let message = "Error al actualizar el perfil."
      if (isAxiosError(error) && typeof error.response?.data?.detail === "string") {
        message = error.response.data.detail
      }
      toast.error(message)
    },
  })
}
