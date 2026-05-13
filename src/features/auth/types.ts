// ── Canonical User type ───────────────────────────────────────────────────────
// This is the SINGLE source of truth for the User shape in the entire frontend.
// Django sends `id` as a number (auto PK), so we use `number` here.

export interface User {
  id: number
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
  is_superuser?: boolean
}

export interface Credentials {
  username: string
  password: string
}

export interface RegisterData extends Credentials {
  first_name?: string
  last_name?: string
  password_confirmation?: string
}

export interface AuthResponse {
  user: User
  access: string
  refresh: string
}

export interface AuthState {
  user: User | null
  setAuth: (user: User | null) => void
  logout: () => void
}
