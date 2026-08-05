import { z } from "zod/v4"
import type { Product } from "./types"

// ── Filter schema (zod) ───────────────────────────────────────────────────────

export const filterSchema = z.object({
  search: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  category: z.string().optional(),
})

export type FilterValues = z.infer<typeof filterSchema>

// ── Image resolver ────────────────────────────────────────────────────────────
// Returns the feature image URL, or the first image, or undefined if no images.

export const getProductImage = (product: Product): string | undefined => {
  if (product.images.length === 0) return undefined
  const featured = product.images.find((img) => img.is_feature)
  return featured ? featured.image : product.images[0].image
}

// ── Client-side filter ────────────────────────────────────────────────────────

export const applyFilters = (
  products: Product[],
  filters: FilterValues,
): Product[] => {
  const query = (filters.search ?? "").toLowerCase()
  return products.filter((p) => {
    const price = Number(p.price) || 0
    const name = p.name.toLowerCase()
    const matchSearch = name.includes(query)
    const matchCategory =
      !filters.category ||
      filters.category === "Todo" ||
      p.category_name === filters.category
    const hasMin= filters.minPrice != null && filters.minPrice > 0
    const hasMax= filters.maxPrice != null && filters.maxPrice > 0
    const matchMin = !hasMin || price >= (filters.minPrice as number)
    const matchMax = !hasMax || price <=(filters.maxPrice as number)
    return matchSearch && matchCategory && matchMin && matchMax
  })
}

// ── Currency formatting ───────────────────────────────────────────────────────

export const formatPriceInBs = (price: string | number, dolarRate: number): string => {
  const numericPrice = typeof price === "string" ? Number(price) : price
  return (numericPrice * dolarRate).toFixed(2)
}
