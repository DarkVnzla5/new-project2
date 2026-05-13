import api from "@/services/Api"
import type { Product, CreateProductPayload, UpdateProductPayload } from "./types"

// ── Product Service ───────────────────────────────────────────────────────────
// This is the ONLY file that knows the product API URLs.
// Hooks and components call these methods — never api.get/post directly.

export const ProductService = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await api.get("/products/")
    return data
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}/`)
    return data
  },

  create: async (payload: CreateProductPayload): Promise<Product> => {
    const { data } = await api.post("/products/", payload)
    return data
  },

  update: async ({ id, ...payload }: UpdateProductPayload): Promise<Product> => {
    const { data } = await api.patch(`/products/${id}/`, payload)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}/`)
  },
}
