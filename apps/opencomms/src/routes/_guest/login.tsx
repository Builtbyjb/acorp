import { createFileRoute, Link } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight } from '../-icons.tsx'

export const Route = createFileRoute('/_guest/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16 overflow-hidden">
      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: '#4382df0e' }}
      />

      <div className="relative animate-fade-up w-full max-w-sm">
        {/* Eyebrow */}
        <div className="text-center mb-8">
          <Link to="/" className="group inline-flex items-center gap-2 mb-6">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-black transition-transform group-hover:scale-95"
              style={{ backgroundColor: '#4382df' }}
            >
              O
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: '#0f172a' }}>
              OpenComms
            </span>
          </Link>
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2"
            style={{ color: '#7F8CAA' }}
          >
            Welcome back
          </p>
          <h1
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: '#0f172a', letterSpacing: '-0.03em' }}
          >
            Log in to your workspace
          </h1>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-3xl p-8"
          style={{ boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07' }}
        >
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold" style={{ color: '#0f172a' }}>
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                className="h-9 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold" style={{ color: '#0f172a' }}>
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs transition-opacity hover:opacity-70"
                  style={{ color: '#4382df' }}
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="h-9 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#4382df', boxShadow: '0 4px 20px #4382df35' }}
            >
              Log in <ArrowRight size={14} />
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: '#7F8CAA' }}>
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold transition-opacity hover:opacity-70"
            style={{ color: '#4382df' }}
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
