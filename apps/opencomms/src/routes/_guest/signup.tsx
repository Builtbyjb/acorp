import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_guest/signup')({
  component: SignupPage,
})

function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <p className="text-2xl font-bold tracking-tight text-primary">OpenComms</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>
              Free for 14 days &middot; No credit card required
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Jane" autoComplete="given-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Smith" autoComplete="family-name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="org-name">Organisation name</Label>
                <Input id="org-name" placeholder="Acme Corp" autoComplete="organization" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Work email</Label>
                <Input id="signup-email" type="email" placeholder="you@company.com" autoComplete="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />
              </div>

              <p className="text-xs text-muted-foreground">
                By signing up you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>

              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center text-sm text-muted-foreground">
            Already have an account?&nbsp;
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
