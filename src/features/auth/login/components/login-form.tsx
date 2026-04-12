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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      recuerdame: false,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-primary">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
              <form.Field
                name="password"
                children={(field) => (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id={field.name}
                      type="password"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
              <Field>
                <form.Field
                  name="recuerdame"
                  children={(field) => (
                    <Field className="flex flex-col items-center">
                      <FieldLabel htmlFor={field.name}>Recordarme</FieldLabel>
                      <Input
                        id={field.name}
                        type="checkbox"
                        className="w-4 h-4"
                        checked={field.state.value}
                        onChange={(e) => field.handleChange(e.target.checked)}
                      />
                    </Field>
                  )}
                />
              </Field>
              <Field>
                <form.Subscribe
                  selector={(state) => state.canSubmit}
                  children={(canSubmit) => (
                    <Button type="submit" disabled={!canSubmit}>
                      Login
                    </Button>
                  )}
                />
                <FieldDescription className="text-center text-white">
                  Aun sin cuenta? <a href="/register">Registrate Aqui</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
