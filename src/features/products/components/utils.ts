import { z } from "zod/v4"
import type { Product, ProductImage } from "./types"

// ── Filter schema (zod) ───────────────────────────────────────────────────────

export const filterSchema = z.object({
  search: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  category: z.string().optional(),
})

export type FilterValues = z.infer<typeof filterSchema>

// ── Image resolver ────────────────────────────────────────────────────────────

export const getProductImage = (product: Product): string | undefined => {
  if (product.thumbnail) return product.thumbnail
  if (!product.images || product.images.length === 0) return undefined
  const firstImage: ProductImage = product.images[0]
  return typeof firstImage === "string" ? firstImage : firstImage.image
}

// ── Client-side filter ────────────────────────────────────────────────────────

export const applyFilters = (
  products: Product[],
  filters: FilterValues,
): Product[] => {
  const query = (filters.search ?? "").toLowerCase()
  return products.filter((p) => {
    const price = Number(p.price) || 0
    const name = (p.name || p.title || "").toLowerCase()
    const matchSearch = name.includes(query)
    const matchCategory =
      !filters.category ||
      filters.category === "Todo" ||
      p.category === filters.category
    const matchMin = filters.minPrice == null || price >= filters.minPrice
    const matchMax = filters.maxPrice == null || price <= filters.maxPrice
    return matchSearch && matchCategory && matchMin && matchMax
  })
}
