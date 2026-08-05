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
import { useRegister } from "../hooks/useRegister"
import { useForm } from "node_modules/@tanstack/react-form/dist/esm/useForm"
import { registerSchema } from "../../schemas/auth.schema"
import { Link } from "node_modules/@base-ui/react/esm/toolbar/index.parts"

export function Registerform({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate, isPending } = useRegister()
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value)
    },
  })
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crear Cuenta</CardTitle>
          <CardDescription>
            Ingresa tus datos para crear una cuenta
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
              {/* Email / Usuario */}
              <form.Field
                name="email"
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.errors.length > 0 ? true : undefined
                    }
                  >
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="m@example.com"
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
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.errors.length > 0 ? true : undefined
                    }
                  >
                    <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      autoComplete="new-password"
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

              {/* Botón y Enlace */}
              <Field>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!canSubmit || isSubmitting || isPending}
                    >
                      {isSubmitting || isPending
                        ? "Creando cuenta..."
                        : "Crear Cuenta"}
                    </Button>
                  )}
                />
                <FieldDescription className="text-center mt-4">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to="/login"
                    className="underline underline-offset-4 font-medium hover:text-primary"
                  >
                    Inicia sesión
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
