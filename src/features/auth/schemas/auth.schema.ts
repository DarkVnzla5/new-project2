import { z } from "zod/v4"

export const loginSchema = z.object({
  email: z.string().email("El correo electrónico es inválido"),
  password: z.string().min(4, "La contraseña es requerida"),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: z.string().min(4, "La contraseña es requerida"),
})

export type RegisterSchema = z.infer<typeof registerSchema>
