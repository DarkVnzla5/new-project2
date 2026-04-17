export type ProductImage = string | { image: string }

export interface Product {
  id: number
  name?: string
  title?: string
  description?: string
  price: number | string
  category?: string
  thumbnail?: string
  images?: ProductImage[]
  created_at?: string
  updated_at?: string
  quantity?: number
}

export interface CreateProductPayload {
  name: string
  price: number
  category?: string
  description?: string
  thumbnail?: string
  images?: string[]
  quantity?: number
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: number
}

export interface ProductFilters {
  search?: string
  minPrice?: number
  maxPrice?: number
  category?: string
}
