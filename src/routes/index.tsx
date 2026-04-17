import { createFileRoute } from "@tanstack/react-router"
import IndexLayout from "@/layouts/index-layout"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return <IndexLayout />
}
