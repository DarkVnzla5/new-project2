// ── Product types ─────────────────────────────────────────────────────────────
// These MUST match the Django ProductSerializer output exactly.
// Django fields: id, name, brand, description, price, category, category_name,
//                is_active, stock, rating, num_reviews, images, updated_by_name,
//                created_at, updated_at

export interface ProductImage {
  id: number
  image: string
  is_feature: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string // UUID from Django
  name: string
  brand: string
  description: string
  price: string // Django DecimalField serializes as string
  category: number // FK id
  category_name: string // ReadOnlyField from serializer
  is_active: boolean
  stock: number
  rating: string // Django DecimalField serializes as string
  num_reviews: number
  images: ProductImage[]
  updated_by_name: string | null // Username of who last modified (null if never edited)
  created_at: string
  updated_at: string
}

export interface CreateProductPayload {
  name: string
  brand: string
  description: string
  price: number
  category: number
  stock?: number
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: string
}

export interface ProductFilters {
  search?: string
  minPrice?: number
  maxPrice?: number
  category?: string
}
