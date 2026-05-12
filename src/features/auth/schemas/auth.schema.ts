import { z } from "zod/v4"

export const loginSchema = z.object({
  email: z.string().email("El correo electrónico es inválido"),
  password: z.string().min(4, "La contraseña es requerida"),
})

export type LoginSchema = z.infer<typeof loginSchema>
