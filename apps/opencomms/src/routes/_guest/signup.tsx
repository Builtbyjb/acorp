import { createFileRoute, Link } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight } from '../-icons.tsx'

export const Route = createFileRoute('/_guest/signup')({
  component: SignupPage,
})

function SignupPage() {
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
        {/* Header */}
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
            Free 14-day trial · No card required
          </p>
          <h1
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: '#0f172a', letterSpacing: '-0.03em' }}
          >
            Create your account
          </h1>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-3xl p-8"
          style={{ boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07' }}
        >
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="first-name" className="text-xs font-semibold" style={{ color: '#0f172a' }}>
                  First name
                </Label>
                <Input id="first-name" placeholder="Jane" autoComplete="given-name" className="h-9 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="last-name" className="text-xs font-semibold" style={{ color: '#0f172a' }}>
                  Last name
                </Label>
                <Input id="last-name" placeholder="Smith" autoComplete="family-name" className="h-9 rounded-xl" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="org-name" className="text-xs font-semibold" style={{ color: '#0f172a' }}>
                Organisation name
              </Label>
              <Input id="org-name" placeholder="Acme Corp" autoComplete="organization" className="h-9 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-email" className="text-xs font-semibold" style={{ color: '#0f172a' }}>
                Work email
              </Label>
              <Input id="signup-email" type="email" placeholder="you@company.com" autoComplete="email" className="h-9 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-password" className="text-xs font-semibold" style={{ color: '#0f172a' }}>
                Password
              </Label>
              <Input id="signup-password" type="password" placeholder="At least 8 characters" autoComplete="new-password" className="h-9 rounded-xl" />
            </div>

            <p className="text-xs leading-relaxed" style={{ color: '#7F8CAA' }}>
              By signing up you agree to our{' '}
              <Link to="/terms" className="font-medium transition-opacity hover:opacity-70" style={{ color: '#4382df' }}>
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="font-medium transition-opacity hover:opacity-70" style={{ color: '#4382df' }}>
                Privacy Policy
              </Link>.
            </p>

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#4382df', boxShadow: '0 4px 20px #4382df35' }}
            >
              Create account <ArrowRight size={14} />
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: '#7F8CAA' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold transition-opacity hover:opacity-70"
            style={{ color: '#4382df' }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
