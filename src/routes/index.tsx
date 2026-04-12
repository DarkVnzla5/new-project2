import { createFileRoute } from "@tanstack/react-router"
import Sidebar from "@/features/Filterside/components/filterSide"
import Products from "@/features/products/components/products"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="flex min-h-svh w-full">
      <Sidebar />
      <Products />
    </div>
  )
}
