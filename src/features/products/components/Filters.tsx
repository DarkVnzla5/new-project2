import { useForm } from "@tanstack/react-form"
import { useQuery } from "@tanstack/react-query"
import { ProductService } from "../types/services"
import { productKeys } from "../hooks/mutations"
import { RotateCcw } from "lucide-react"
import { useProductFilterStore } from "../stores/store"
import type { Product } from "../types/types"
import type { FilterValues } from "../types/utils"
import { filterSchema } from "../types/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldContent,
} from "@/components/ui/field"

export default function Filters() {
  const { filters, setFilters, resetFilters } = useProductFilterStore()
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: productKeys.all,
    queryFn: ProductService.getAll,
  })
  const categories = Array.from(
    new Set(products.map((product) => product.category_name).filter(Boolean)),
  )

  // Initialize TanStack Form
  const form = useForm({
    defaultValues: filters,
    validators: {
      onChange: filterSchema,
    },
    onSubmit: async ({ value }) => {
      setFilters(value)
    },
  })

  // Helper to handle immediate changes for some fields
  const handleImmediateChange = (name: keyof FilterValues, value: any) => {
    form.setFieldValue(name, value)
    setFilters({ ...form.state.values, [name]: value })
  }

  return (
    <section className="p-2 flex gap-4 items-center bg-cyan-500">
      <Button
        variant="secondary"
        size="icon"
        type="button"
        onClick={() => {
          form.reset()
          resetFilters()
        }}
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        <RotateCcw className="size-4" />
      </Button>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
          e.stopPropagation()
        }}
        className="flex gap-2 items-center"
      >
        <FieldGroup className="flex items-center">
          <form.Field
            name="category"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>Categoria</FieldLabel>
                  <FieldContent>
                    <Select
                      value={field.state.value ? field.state.value : "Todo"}
                      onValueChange={(value) =>
                        handleImmediateChange(
                          "category",
                          value === "Todo" ? "" : value,
                        )
                      }
                    >
                      <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-muted-foreground/20">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Todo">Todo</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
              )
            }}
          />
        </FieldGroup>
      </form>
    </section>
  )
}
