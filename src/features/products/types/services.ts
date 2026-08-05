import api from "@/services/Api"
import type { Product, CreateProductPayload, UpdateProductPayload } from "./types"

// ── Paginated Response ────────────────────────────────────────────────────────
// Django REST Framework's LimitOffsetPagination wraps results like this:
// { count: 50, next: "...?limit=10&offset=10", previous: null, results: [...] }

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ── Product Service ───────────────────────────────────────────────────────────
// This is the ONLY file that knows the product API URLs.
// Hooks and components call these methods — never api.get/post directly.

export const ProductService = {
  getAll: async (): Promise<Product[]> => {
    // Fetch all products (bypass pagination with a high limit for now)
    const { data } = await api.get<PaginatedResponse<Product>>("/products/", {
      params: { limit: 100 },
    })
    return data.results
  },

  getPage: async (offset = 0, limit = 10): Promise<PaginatedResponse<Product>> => {
    const { data } = await api.get<PaginatedResponse<Product>>("/products/", {
      params: { limit, offset },
    })
    return data
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}/`)
    return data
  },

  create: async (payload: CreateProductPayload): Promise<Product> => {
    const { data } = await api.post<Product>("/products/", payload)
    return data
  },

  update: async ({ id, ...payload }: UpdateProductPayload): Promise<Product> => {
    const { data } = await api.patch<Product>(`/products/${id}/`, payload)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}/`)
  },
}
