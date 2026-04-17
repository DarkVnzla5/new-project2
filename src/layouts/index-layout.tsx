import ProductsList from "@/features/products/components/productList"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Filters from "@/features/Filterside/components/Filters"

export default function IndexLayout() {
  return (
    <SidebarProvider>
      <Filters />
      <div>
        <SidebarTrigger />
      </div>
      <div>
        <ProductsList />
      </div>
    </SidebarProvider>
  )
}
