import { Outlet, Link } from "@tanstack/react-router"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDolar } from "@/hooks/useDolar"
import {
  LayoutDashboard,
  ShoppingBag,
  Receipt,
  Package,
  Users,
  Settings,
  HelpCircle,
  BarChart3,
  Calculator,
} from "lucide-react"
import { BussinessName } from "@/constants"

export default function IndexLayout() {
  const { data } = useDolar()
  const logout = useAuthStore((state) => state.logout)
  const isLoggedIn = useAuthStore((state) => !!state.user)
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex min-h-screen">
      {/* 1. BARRA LATERAL FIJA */}
      <aside className="w-1/4 border-r p-4 flex flex-col justify-between md:flex">
        <div className="space-y-6">
          {/* Logo o Título */}
          <div className="flex items-center gap-2 px-3">
            <span className="font-bold text-lg">{BussinessName}</span>
          </div>

          {/* Menú de Botones con TanStack Router Link */}
          <nav className="space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl [&.active]:bg-primary [&.active]:text-primary-foreground text-muted-foreground hover:bg-muted hover:text-foreground font-medium transition-colors"
            >
              <LayoutDashboard className="size-5" />
              Dashboard
            </Link>

            <Link
              to="/pos"
              className="flex items-center gap-3 px-4 py-3 rounded-xl [&.active]:bg-primary [&.active]:text-primary-foreground text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <ShoppingBag className="size-5" />
              POS
            </Link>

            <Link
              to="/sales"
              className="flex items-center gap-3 px-4 py-3 rounded-xl [&.active]:bg-primary [&.active]:text-primary-foreground text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Receipt className="size-5" />
              Sales
            </Link>

            <Link
              to="/accounting"
              className="flex items-center gap-3 px-4 py-3 rounded-xl [&.active]:bg-primary [&.active]:text-primary-foreground text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Calculator className="size-5" />
              Accounting
            </Link>

            <Link
              to="/purchase"
              className="flex items-center gap-3 px-4 py-3 rounded-xl [&.active]:bg-primary [&.active]:text-primary-foreground text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Package className="size-5" />
              Purchase
            </Link>

            <Link
              to="/customers"
              className="flex items-center gap-3 px-4 py-3 rounded-xl [&.active]:bg-primary [&.active]:text-primary-foreground text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Users className="size-5" />
              Customers & HR
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-3 px-4 py-3 rounded-xl [&.active]:bg-primary [&.active]:text-primary-foreground text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <BarChart3 className="size-5" />
              Reports
            </Link>
          </nav>
        </div>

        {/* Opciones de abajo */}
        <div className="space-y-1 border-t pt-4">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl [&.active]:bg-primary [&.active]:text-primary-foreground text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Settings className="size-5" />
            Settings
          </Link>
          <Link
            to="/help"
            className="flex items-center gap-3 px-4 py-3 rounded-xl [&.active]:bg-primary [&.active]:text-primary-foreground text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <HelpCircle className="size-5" />
            Help
          </Link>
        </div>
        <div className="border-t">
          <div>
            {isLoggedIn ? (
              <Button size="sm" variant="destructive" onClick={logout}>
                <Link to="/login">Salir</Link>
              </Button>
            ) : (
              <Link to="/login">
                <Button size="sm">Iniciar Sesion</Button>
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL DE LA DERECHA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Cabecera superior */}
        <header className="flex items-center justify-between h-20 px-8 border-b bg-background">
          <div>
            {user ? (
              <p className="text-2xl font-bold">
                {user.first_name} {user.last_name}
              </p>
            ) : (
              <p>Welcome, Guest</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            {data != null && (
              <Badge variant="outline">${data.toFixed(2)}</Badge>
            )}
            <Badge variant="outline">{new Date().toLocaleDateString()}</Badge>
          </div>
        </header>
        <main className="flex-1 p-8 space-y-6 overflow-y-auto">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
