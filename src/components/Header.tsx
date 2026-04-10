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
    <nav className="grid grid-cols-3 justify-around gap-2 px-4 py-2 text-primary bg-secondary items-center ">
      <section>
        <div>
          <Button>
            <Link to="/">{BussinessName}</Link>
          </Button>
        </div>
      </section>
      <section>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <form.Field
              name="search"
              children={(field) => (
                <>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Buscar.."
                  />
                </>
              )}
            />
          </form>
        </div>
        <div>whatever</div>
        <div></div>
      </section>
      <section>
        <div>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
        <div>
          <Badge>{data?.toFixed(2)}</Badge>
          <Badge>{new Date().toLocaleDateString()}</Badge>
        </div>
        <div>auths</div>
      </section>
    </nav>
  )
}
