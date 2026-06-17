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

export const Route = createFileRoute('/_guest/login')({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = context.auth ? await context.auth.authenticate() : false
    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const next: typeof errors = {}
    if (!email.trim() || !email.includes('@')) next.email = 'Enter a valid email address'
    if (!password.trim()) next.password = 'Password is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const ok = await login(email)
      if (ok) {
        toast.success('Welcome back!')
        navigate({ to: '/dashboard' })
      } else {
        toast.error('No demo account found. Please sign up first.')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoLogin = async () => {
    setEmail('demo@opencomms.dev')
    setPassword('password')
    setIsSubmitting(true)
    try {
      const ok = await login('demo@opencomms.dev')
      if (ok) {
        toast.success('Welcome back!')
        navigate({ to: '/dashboard' })
      } else {
        toast.error('Demo account not found. Sign up to create it.')
      }
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
              <CardTitle className="text-xl font-bold">Log in</CardTitle>
            </div>
            <CardDescription className="text-neutral-500">
              Log in to your OpenComms workspace
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form id="login-form" onSubmit={handleSubmit}>
              <FieldGroup>
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email-input">
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
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
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && <FieldError errors={[errors.password]} />}
                </Field>
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="bg-white border-t border-black/5 flex-col gap-3">
            <div className="flex w-full gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => { setEmail(''); setPassword(''); setErrors({}) }} disabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" form="login-form" className="flex-1" disabled={isSubmitting}>
                {isSubmitting && <Spinner className="mr-2" aria-hidden="true" />}
                {isSubmitting ? 'Submitting...' : 'Log in'}
              </Button>
            </div>
            <Button type="button" variant="ghost" className="w-full" onClick={handleDemoLogin} disabled={isSubmitting}>
              Demo login
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary hover:opacity-70">
            Sign up free
          </Link>
        </p>

        <p className="text-center text-xs text-neutral-400 mt-4">
          By logging in, you agree to our{' '}
          <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  )
}
