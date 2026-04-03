import { Button } from "@/components/ui/button"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center bg-blue-200 text-black">
      Hello "/_auth/register"!
      <Link to="/login">
        <Button>To login</Button>
      </Link>
      HOLA
    </div>
  )
}
