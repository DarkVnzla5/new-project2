import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LogInIcon,
  MailIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field as ShadcnField,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // TODO: connect to auth logic
      console.log(value)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo / brand mark */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <LockIcon className="size-6" />
          </div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your credentials below to continue
            </CardDescription>
          </CardHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <CardContent>
              <FieldGroup>
                {/* Email field */}
                <form.Field
                  name="email"
                  children={(field) => (
                    <ShadcnField>
                      <FieldLabel htmlFor={field.name}>
                        <MailIcon data-icon="inline-start" />
                        Email address
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        required
                      />
                    </ShadcnField>
                  )}
                />

                {/* Password field */}
                <form.Field
                  name="password"
                  children={(field) => (
                    <ShadcnField>
                      <FieldLabel htmlFor={field.name}>
                        <LockIcon data-icon="inline-start" />
                        Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOffIcon className="size-4" />
                          ) : (
                            <EyeIcon className="size-4" />
                          )}
                        </button>
                      </div>
                      <FieldDescription>
                        <a
                          href="/forgot-password"
                          className="ml-auto block w-fit text-xs text-primary hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </FieldDescription>
                    </ShadcnField>
                  )}
                />
              </FieldGroup>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <form.Subscribe
                selector={(state) => state.isSubmitting}
                children={(isSubmitting) => (
                  <Button
                    id="login-submit"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Signing in…
                      </>
                    ) : (
                      <>
                        <LogInIcon data-icon="inline-start" />
                        Sign in
                      </>
                    )}
                  </Button>
                )}
              />

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Create one
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
