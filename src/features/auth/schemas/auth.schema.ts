import { z } from "zod/v4"

export const loginSchema = z.object({
  username: z.string().trim().min(3, "El nombre de usuario es requerido"),
  password: z.string().min(4, "La contraseña es requerida"),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email("El correo electrónico es inválido"),
  password: z.string().min(4, "La contraseña es requerida"),
})

export type RegisterSchema = z.infer<typeof registerSchema>
