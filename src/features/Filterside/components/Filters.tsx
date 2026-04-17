import { useForm } from "@tanstack/react-form"
import { Search, RotateCcw } from "lucide-react"

import { useProductFilterStore } from "@/features/products/store"
import { filterSchema, type FilterValues } from "@/features/products/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldContent,
} from "@/components/ui/field"

const CATEGORIES = ["Todo", "Pinturas y Acabados", "Materiales de construccion"]

export default function Filters() {
  const { filters, setFilters, resetFilters } = useProductFilterStore()

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
    setFilters({ [name]: value })
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4 flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Filtros</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            resetFilters()
            form.reset()
          }}
          className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-6"
        >
          <SidebarGroup>
            <SidebarGroupLabel className="px-0 text-sm font-medium mb-4">
              Configuración de Búsqueda
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <FieldGroup>
                {/* Categoría */}
                <form.Field
                  name="category"
                  children={(field) => (
                    <Field>
                      <FieldLabel>Categoría</FieldLabel>
                      <FieldContent>
                        <Select
                          value={field.state.value || "Todo"}
                          onValueChange={(val) =>
                            handleImmediateChange("category", val)
                          }
                        >
                          <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-muted-foreground/20">
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FieldContent>
                    </Field>
                  )}
                />

                {/* Búsqueda */}
                <form.Field
                  name="search"
                  children={(field) => (
                    <Field>
                      <FieldLabel>Buscar producto</FieldLabel>
                      <FieldContent className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Ej: Camiseta, Laptop..."
                          className="pl-9 bg-background/50 backdrop-blur-sm border-muted-foreground/20"
                          value={field.state.value || ""}
                          onChange={(e) =>
                            handleImmediateChange("search", e.target.value)
                          }
                        />
                      </FieldContent>
                    </Field>
                  )}
                />

                {/* Rango de Precio */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-sm font-medium">Precio</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field
                      name="minPrice"
                      children={(field) => (
                        <Field>
                          <FieldLabel className="text-[10px] uppercase text-muted-foreground tracking-widest">
                            Mínimo
                          </FieldLabel>
                          <Input
                            type="number"
                            placeholder="0"
                            className="h-9 bg-background/50 backdrop-blur-sm"
                            value={field.state.value ?? ""}
                            onChange={(e) =>
                              handleImmediateChange(
                                "minPrice",
                                e.target.value === ""
                                  ? undefined
                                  : Number(e.target.value),
                              )
                            }
                          />
                        </Field>
                      )}
                    />
                    <form.Field
                      name="maxPrice"
                      children={(field) => (
                        <Field>
                          <FieldLabel className="text-[10px] uppercase text-muted-foreground tracking-widest">
                            Máximo
                          </FieldLabel>
                          <Input
                            type="number"
                            placeholder="+"
                            className="h-9 bg-background/50 backdrop-blur-sm"
                            value={field.state.value ?? ""}
                            onChange={(e) =>
                              handleImmediateChange(
                                "maxPrice",
                                e.target.value === ""
                                  ? undefined
                                  : Number(e.target.value),
                              )
                            }
                          />
                        </Field>
                      )}
                    />
                  </div>
                </div>
              </FieldGroup>
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t">
        <Button
          onClick={() => form.handleSubmit()}
          className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
        >
          Aplicar Filtros
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
