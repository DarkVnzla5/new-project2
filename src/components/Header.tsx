import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"
import { useDolar } from "@/hooks/useDolar"
import { useAuthStore } from "@/features/auth/store/useAuthStore"

export function Header() {
  const { data } = useDolar()
  const user = useAuthStore((state) => state.user)
  const isLoggedIn = !!user

  const BussinessName = "Comercial Vuelvan Caras, C.A"

  return (
    <nav className="flex flex-col gap-2 px-4 py-2 bg-secondary justify-between text-primary md:flex-row md:items-center md:gap-4">
      {/* Logo / Nombre */}
      <div className="flex shrink-0 items-center">
        <Button asChild variant="ghost">
          <Link to="/">{BussinessName}</Link>
        </Button>
      </div>
      <div>
        <div>
          <Button size="sm" variant="outline">
            <Link to="/control-tab">Panel de Control</Link>
          </Button>
        </div>
      </div>
      {/* Acciones — lado derecho */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="flex items-center gap-1">
          {data != null && <Badge variant="outline">${data.toFixed(2)}</Badge>}
          <Badge variant="outline">{new Date().toLocaleDateString()}</Badge>
        </div>
        {isLoggedIn ? (
          <Button size="sm" variant="outline">
            <Link to="/login">Logout</Link>
          </Button>
        ) : (
          <Link to="/login">
            <Button size="sm">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}
