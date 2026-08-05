import { createFileRoute } from "@tanstack/react-router"
import Login from "@/features/auth/login/page"

export const Route = createFileRoute("/_auth/login")({
  component: Login,
})
