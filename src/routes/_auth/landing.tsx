import { createFileRoute } from "@tanstack/react-router"
import landing from "@/features/Landing/page"

export const Route = createFileRoute("/_auth/landing")({
  component: landing,
})
