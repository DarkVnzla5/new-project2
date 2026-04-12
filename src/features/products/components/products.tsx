import { useQuery } from "@tanstack/react-query"
import api from "@/lib/client"
import { useProductFilterStore } from "../store"
import { applyFilters } from "./utils"
import type { Product } from "./types"

export default function ProductsList() {
  // 1. Get current filters from Zustand
  const filters = useProductFilterStore((state) => state.filters)

  // 2. Fetch products (using TanStack Query)
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products/")
      return data
    },
  })

  // 3. Apply the filters from utils.ts
  const filteredProducts = applyFilters(products, filters)

  if (isLoading) return <div>Cargando productos...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-sm">
          <h3 className="font-bold">{product.name || product.title}</h3>
          <p className="text-primary font-semibold">${product.price}</p>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      ))}

      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-20 text-muted-foreground">
          No se encontraron productos con estos filtros.
        </div>
      )}
    </div>
  )
}
