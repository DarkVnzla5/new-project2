import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { useLogin } from "../hooks/useLogin"
import { loginSchema } from "../../schemas/auth.schema"
import { Link } from "@tanstack/react-router"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate, isPending } = useLogin()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      mutate(value)
    },
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tu usuario y contraseña para acceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              {/* Usuario */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const result = loginSchema.shape.email.safeParse(value)
                    return result.success
                      ? undefined
                      : result.error.issues[0].message
                  },
                }}
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.errors.length > 0 ? true : undefined
                    }
                  >
                    <FieldLabel htmlFor={field.name}>
                      Correo electrónico
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="[EMAIL_ADDRESS]"
                      autoComplete="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError
                      errors={field.state.meta.errors.map((e) => ({
                        message: typeof e === "string" ? e : String(e),
                      }))}
                    />
                  </Field>
                )}
              />

              {/* Contraseña */}
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    const result = loginSchema.shape.password.safeParse(value)
                    return result.success
                      ? undefined
                      : result.error.issues[0].message
                  },
                }}
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.errors.length > 0 ? true : undefined
                    }
                  >
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                      <a
                        href="#"
                        className="text-sm underline-offset-4 hover:underline text-muted-foreground"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      autoComplete="current-password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError
                      errors={field.state.meta.errors.map((e) => ({
                        message: typeof e === "string" ? e : String(e),
                      }))}
                    />
                  </Field>
                )}
              />

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>

              <FieldDescription className="text-center">
                ¿Aún sin cuenta?{" "}
                <Link
                  to="/register"
                  className="underline underline-offset-4 font-medium hover:text-primary"
                >
                  Regístrate aquí
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
