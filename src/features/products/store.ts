import { create } from "zustand"
import type { FilterValues } from "./utils"

interface ProductFilterStore {
  filters: FilterValues
  setFilters: (filters: Partial<FilterValues>) => void
  resetFilters: () => void
}

const initialFilters: FilterValues = {
  search: "",
  category: "Todo",
  minPrice: undefined,
  maxPrice: undefined,
}

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}))
