import { useQuery } from "@tanstack/react-query"
import api from "@/lib/client"
import { useProductFilterStore } from "../store"
import { applyFilters, getProductImage } from "./utils"
import type { Product } from "./types"
import { useDolar } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

export default function ProductsList() {
  // 1. Get current filters from Zustand
  const filters = useProductFilterStore((state) => state.filters)
  const { data } = useDolar()
  // 2. Fetch products (using TanStack Query)
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products/")
      console.log("data", data)
      return data
    },
  })

  // 3. Apply the filters from utils.ts
  const filteredProducts = applyFilters(products, filters)

  if (isLoading) return <div>Cargando productos...</div>
  if (products.length === 0) return <div>No se encontraron productos.</div>
  if (products.length > 0) console.log("Se encontraron productos.", products)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="border p-4 rounded-lg shadow-sm">
          <img
            src={getProductImage(product)}
            alt={product.name}
            className="size-48 object-cover"
          />
          <CardHeader>
            <CardTitle>{product.name || product.title}</CardTitle>
            <CardDescription>${product.price}</CardDescription>
            <CardDescription>
              Bs {(Number(product.price) * Number(data)).toFixed(2)}
            </CardDescription>
            <CardDescription>Cantidad: {product.quantity} und</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
              {product.category}
            </span>
          </CardContent>
        </Card>
      ))}

      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-20 text-muted-foreground">
          No se encontraron productos con estos filtros.
        </div>
      )}
    </div>
  )
}
