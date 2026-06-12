import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_guest/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <p className="text-2xl font-bold tracking-tight text-primary">OpenComms</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Log in to your workspace</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="w-full">
                Log in
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center text-sm text-muted-foreground">
            Don&apos;t have an account?&nbsp;
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up free
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
