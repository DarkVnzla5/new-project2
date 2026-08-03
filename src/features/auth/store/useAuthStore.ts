import { create } from "zustand"
import {persist} from "zustand/middleware"
import type { User, AuthState } from "../types"

// Re-export User so existing imports like `import { User } from ".../useAuthStore"` 
// still work, but they all point to the same canonical definition.
export type { User }
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      setAuth:(user, token, refreshToken)=>{
        set({ user, token, refreshToken })
      },
      logout: () => set({ user: null, token: null, refreshToken: null }),
    }),
    {
      name: "auth-storage", // nombre de la clave en localStorage
    },
  ),
)