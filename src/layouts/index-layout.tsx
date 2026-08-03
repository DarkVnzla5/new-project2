import ProductsList from "@/features/products/components/productList"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Filters from "@/features/products/components/Filters"

export default function IndexLayout() {
  return (
    <div>
      <Filters />
      <SidebarProvider>
        <div>
          <SidebarTrigger />
        </div>
        <div>
          <ProductsList />
        </div>
      </SidebarProvider>
    </div>
  )
}
