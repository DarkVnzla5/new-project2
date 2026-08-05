import { createRootRoute, Outlet } from "@tanstack/react-router"

import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { Toaster } from "sonner"

import "../styles.css"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
      {/* Envolvemos las herramientas en un div contenedor limpio por seguridad */}
      <div className="contents">
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "TanStack Router",
              render: () => <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </div>
    </>
  )
}
