import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/features/auth/store/AuthState"
import api from "@/services/Api"

export const useAuthMutations = () => {
  const setAuth = useAuthStore((state) => state.setAuth)

  // Mutación de Login
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: any) => {
      const { data } = await api.post("login/", { email, password })
      return data
    },
    onSuccess: (data) => setAuth(data),
  })

  // Mutación de Actualización (maneja FormData automáticamente)
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const userId = useAuthStore.getState().user?.id
      let payload = data

      if (data.avatar instanceof File) {
        payload = new FormData()
        Object.entries(data).forEach(([key, value]) =>
          payload.append(key, value as any),
        )
      }

      const { data: updatedUser } = await api.patch(`users/${userId}/`, payload)
      return updatedUser
    },
    onSuccess: (updatedUser) => {
      const currentUser = useAuthStore.getState().user
      setAuth({ ...currentUser, ...updatedUser })
    },
  })

  return {
    login: loginMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    isLoading: loginMutation.isPending || updateMutation.isPending,
    error: loginMutation.error || updateMutation.error,
  }
}
