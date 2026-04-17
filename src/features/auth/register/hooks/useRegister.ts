import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import api from "@/services/Api"
import type { LoginInput } from "../../schemas/auth.schema"

export const useAuthMutations = () => {
  const setAuth = useAuthStore((state) => state.setAuth)

  const registerMutation = useMutation({
    mutationFn: async ({ username, password }: LoginInput) => {
      const { data } = await api.post("users/register/", { username, password })
      return data
    },
    onSuccess: (data) => {
      console.log(data)
      setAuth(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return {
    register: registerMutation.mutateAsync,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
  }
}
