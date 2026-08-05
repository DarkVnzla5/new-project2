import { Registerform } from "@/features/auth/register/components/Registerform" // Ajusta tu ruta si cambia
import { Store, ShieldCheck, Zap } from "lucide-react"

export function Landing() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* 🟢 Mitad Izquierda: Landing / Información del ERP */}
      <div className="hidden bg-muted lg:flex flex-col justify-between p-10 text-white border-r border-zinc-800">
        <div className="flex items-center gap-3 font-semibold text-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>
          <span>Tu Empresa ERP</span>
        </div>

        <div className="space-y-6 my-auto max-w-md">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Control total de tu negocio en un solo lugar.
          </h1>
          <p className="text-zinc-400 text-lg">
            Gestiona inventarios, ventas, facturación y puntos de venta con una
            interfaz rápida, moderna y diseñada para volar.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white">Rápido y Fluido</h3>
                <p className="text-sm text-zinc-400">
                  Optimizado para despachar ventas al instante.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white">Seguro y Confiable</h3>
                <p className="text-sm text-zinc-400">
                  Tus datos y transacciones bajo estrictos estándares.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-zinc-500">
          © 2026 Tu Empresa ERP. Todos los derechos reservados.
        </div>
      </div>

      {/* 🟢 Mitad Derecha: Formulario de Registro */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto grid w-full max-w-100 gap-6">
          <Registerform />
        </div>
      </div>
    </div>
  )
}
