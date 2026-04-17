import { z } from "zod/v4"

export const loginSchema = z.object({
  username: z.string().min(3, "El nombre de usuario es requerido"),
  password: z.string().min(4, "La contraseña es requerida"),
})

export type LoginSchema = z.infer<typeof loginSchema>
