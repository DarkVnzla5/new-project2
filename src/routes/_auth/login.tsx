import { Button } from "@/components/ui/button"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="flex flex-col gap-4 h-screen items-center justify-center bg-slate-200 text-black">
      Hello "/_auth/login"!
      <Link to="/register">
        <Button>To register</Button>
  )
}
