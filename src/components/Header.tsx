import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useForm } from "@tanstack/react-form"
import { Link } from "@tanstack/react-router"
import { useDolar } from "@/lib/utils"

export function Header() {
  const { data } = useDolar()
  const form = useForm({
    defaultValues: {
      search: "",
    },
    onSubmit: async ({ value }) => {
      console.log("searched: ", value.search)
    },
  })

  const BussinessName = "Comercial Vuelvan Caras, C.A"

  return (
    <nav className="flex flex-col gap-2 px-4 py-2 bg-secondary text-primary md:flex-row md:items-center md:gap-4">
      {/* Logo / Nombre */}
      <div className="flex shrink-0 items-center">
        <Button asChild variant="ghost">
          <Link to="/">{BussinessName}</Link>
        </Button>
      </div>

      {/* Búsqueda — crece para ocupar el espacio disponible */}
      <div className="flex-1 min-w-0">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <form.Field
            name="search"
            children={(field) => (
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Buscar..."
                className="w-full"
              />
            )}
          />
        </form>
      </div>

      {/* Acciones — lado derecho */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="flex items-center gap-1">
          {data != null && (
            <Badge variant="secondary">${data.toFixed(2)}</Badge>
          )}
          <Badge variant="outline">
            {new Date().toLocaleDateString()}
          </Badge>
        </div>
        <Link to="/login">
          <Button size="sm">Login</Button>
        </Link>
      </div>
    </nav>
  )
}
