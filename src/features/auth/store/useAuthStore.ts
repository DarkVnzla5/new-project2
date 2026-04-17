import { create } from "zustand"

export interface User {
  id: string
  email: string
  username: string
  first_name?: string
  last_name?: string
  role?: string
  avatar?: string
  access?: string
  refresh?: string
  created_at?: string
  updated_at?: string
  superUser?: boolean
}

interface AuthState {
  user: User | null
  setAuth: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setAuth: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      if (user.access) localStorage.setItem("authtoken", user.access)
    } else {
      localStorage.clear()
    }
    set({ user })
  },
  logout: () => {
    localStorage.clear()
    set({ user: null })
  },
}))
