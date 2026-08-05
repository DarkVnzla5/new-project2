import { useQueryClient, useMutation } from "@tanstack/react-query"
import { ProductService } from "../types/services"
import type { CreateProductPayload, UpdateProductPayload } from "../types/types"

// ── Product Query Keys ────────────────────────────────────────────────────────
// Centralized so invalidation is consistent across the app.
export const productKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["products", id] as const,
}

// ── Mutations ─────────────────────────────────────────────────────────────────
// Each hook follows the `use` prefix convention (React rules of hooks).
// They call ProductService methods — never api.post/put/delete directly.

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateProductPayload) => ProductService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateProductPayload) => ProductService.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => ProductService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}
