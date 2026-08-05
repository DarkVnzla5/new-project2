import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function toggleMode() {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    setTheme(next)
  }

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor
  const label =
    theme === "system"
      ? "Theme: system. Click to switch to light."
      : `Theme: ${theme}. Click to switch.`

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMode}
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}
