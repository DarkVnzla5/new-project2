import { createFileRoute, redirect } from "@tanstack/react-router"
import IndexLayout from "@/layouts/index-layout"

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const token = localStorage.getItem("token")

    // Si NO hay token, lo mandamos derechito al landing
    if (!token) {
      throw redirect({ to: "/landing" })
    }

    // Si SÍ hay token, dejamos que pase y renderice el IndexLayout
  },
  component: App,
})

function App() {
  return <IndexLayout />
}
