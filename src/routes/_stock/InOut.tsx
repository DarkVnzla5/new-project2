import { createFileRoute } from "@tanstack/react-router"
import InOut from "@/features/stock-control/management/page"

export const Route = createFileRoute("/_stock/InOut")({
  component: InOut,
})
