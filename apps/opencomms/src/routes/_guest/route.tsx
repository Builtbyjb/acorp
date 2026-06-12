import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_guest')({
  component: GuestLayout,
})

function GuestLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
          <Link to="/" className="text-lg font-bold tracking-tight text-primary">
            OpenComms
          </Link>

          <nav className="flex flex-1 items-center gap-1 text-sm">
            <a href="#features" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#pricing" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t bg-background">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="space-y-2">
              <p className="text-base font-bold tracking-tight text-primary">OpenComms</p>
              <p className="text-sm text-muted-foreground">
                Community engagement via SMS &amp; WhatsApp.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-foreground">Product</span>
                <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
                <Link to="/login" className="text-muted-foreground hover:text-foreground">Log in</Link>
                <Link to="/signup" className="text-muted-foreground hover:text-foreground">Sign up</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-foreground">Legal</span>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} OpenComms. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
