import { useState } from 'react'
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { Button } from '@shared/ui/components/button'
import { Input } from '@shared/ui/components/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@shared/ui/components/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@shared/ui/components/field'
import { Spinner } from '@shared/ui/components/spinner'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/Logo'
import { useAuth } from '@/hooks/auth'

export const Route = createFileRoute('/_guest/signup')({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = context.auth ? await context.auth.authenticate() : false
    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: SignupPage,
})

function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    organizationName: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})

  const validate = () => {
    const next: Partial<typeof errors> = {}
    if (form.firstname.trim().length < 2) next.firstname = 'First name is too short'
    if (form.lastname.trim().length < 2) next.lastname = 'Last name is too short'
    if (form.organizationName.trim().length < 2) next.organizationName = 'Organization name is too short'
    if (!form.email.trim() || !form.email.includes('@')) next.email = 'Enter a valid email address'
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const ok = await signup(form)
      if (ok) {
        toast.success('Account created!')
        navigate({ to: '/dashboard' })
      } else {
        toast.error('An account with this email already exists.')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 bg-background">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <Card className="w-full border-black/10 rounded-none">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
              <ArrowLeft
                className="h-6 w-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => navigate({ to: '/' })}
              />
              <CardTitle className="text-xl font-bold">Sign up</CardTitle>
            </div>
            <CardDescription className="text-neutral-500">
              Create your OpenComms workspace
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form id="signup-form" onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-3">
                  <Field data-invalid={!!errors.firstname}>
                    <FieldLabel htmlFor="firstname-input">
                      First name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="firstname-input"
                      placeholder="Jane"
                      autoComplete="given-name"
                      value={form.firstname}
                      onChange={(e) => setForm((f) => ({ ...f, firstname: e.target.value }))}
                    />
                    {errors.firstname && <FieldError errors={[errors.firstname]} />}
                  </Field>

                  <Field data-invalid={!!errors.lastname}>
                    <FieldLabel htmlFor="lastname-input">
                      Last name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="lastname-input"
                      placeholder="Smith"
                      autoComplete="family-name"
                      value={form.lastname}
                      onChange={(e) => setForm((f) => ({ ...f, lastname: e.target.value }))}
                    />
                    {errors.lastname && <FieldError errors={[errors.lastname]} />}
                  </Field>
                </div>

                <Field data-invalid={!!errors.organizationName}>
                  <FieldLabel htmlFor="org-input">
                    Organisation name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="org-input"
                    placeholder="Acme Corp"
                    autoComplete="organization"
                    value={form.organizationName}
                    onChange={(e) => setForm((f) => ({ ...f, organizationName: e.target.value }))}
                  />
                  {errors.organizationName && <FieldError errors={[errors.organizationName]} />}
                </Field>

                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email-input">
                    Work email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                  {errors.email && <FieldError errors={[errors.email]} />}
                </Field>

                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="password-input">
                    Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="password-input"
                    type="password"
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  />
                  {errors.password && <FieldError errors={[errors.password]} />}
                </Field>
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="bg-white border-t border-black/5 flex-col gap-3">
            <Button type="submit" form="signup-form" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Spinner className="mr-2" aria-hidden="true" />}
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:opacity-70">
            Log in
          </Link>
        </p>

        <p className="text-center text-xs text-neutral-400 mt-4">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  )
}
