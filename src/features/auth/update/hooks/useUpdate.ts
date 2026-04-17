import { useMutation } from "@tanstack/react-query"
import api from "@/services/Api"
import { useAuthStore } from "../../store/useAuthStore"

export const useUpdate = () => {
  const { user, setAuth } = useAuthStore()

  return useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as any)
        }
      })
      const { data: updatedUser } = await api.patch(
        `users/${user?.id}/`,
        formData,
      )
      return updatedUser
    },
    onSuccess: (updatedUser) => {
      if (user) {
        setAuth({ ...user, ...updatedUser })
      }
    },
  })
}
