import { createFileRoute } from "@tanstack/react-router"
import Register from "@/features/auth/register/page"

export const Route = createFileRoute("/_auth/register")({
  component: Register,
})
