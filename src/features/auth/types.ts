export interface User {
  id: number
  email: string
  username?: string
  first_name?: string
  last_name?: string
  role?: string
  avatar?: string
  created_at?: string
  updated_at?: string
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
  token: string
  refresh_token?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}
