import { create } from "zustand"
import type { User, AuthState } from "../types"

// Re-export User so existing imports like `import { User } from ".../useAuthStore"` 
// still work, but they all point to the same canonical definition.
export type { User }

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setAuth: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      if (user.access) localStorage.setItem("authtoken", user.access)
      if (user.refresh) localStorage.setItem("refreshtoken", user.refresh)
    } else {
      localStorage.removeItem("user")
      localStorage.removeItem("authtoken")
      localStorage.removeItem("refreshtoken")
    }
    set({ user })
  },
  logout: () => {
    localStorage.removeItem("user")
    localStorage.removeItem("authtoken")
    localStorage.removeItem("refreshtoken")
    set({ user: null })
  },
}))
