import api from "@/services/client"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import type { Product } from "./types"

export function createProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (product: Product) => api.post("/products/", product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
export function updateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (product: Product) =>
      api.put(`/products/${product.id}/`, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
export function deleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
