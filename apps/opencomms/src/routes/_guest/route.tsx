import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
  component: GuestLayout,
})

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
]

function GuestLayout() {
  const routerState = useRouterState()
  const isHome = routerState.location.pathname === '/'

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#ebf0f0' }}>
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{ backgroundColor: '#ebf0f0e8', borderColor: '#7F8CAA22' }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Wordmark */}
          <Link to="/" className="group flex items-center gap-2">
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

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {isHome
              ? NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-60"
                    style={{ color: '#7F8CAA' }}
                  >
                    {link.label}
                  </a>
                ))
              : null}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-1.5 text-sm font-semibold rounded-full transition-all hover:opacity-60"
              style={{ color: '#7F8CAA' }}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#4382df', boxShadow: '0 4px 20px #4382df35' }}
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
      <footer style={{ borderTopColor: '#7F8CAA20', borderTopWidth: 1, borderTopStyle: 'solid' }}>
        <div className="mx-auto max-w-7xl px-6 py-14">
          {/* Main row */}
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            {/* Brand block */}
            <div className="space-y-3 max-w-xs">
              <Link to="/" className="group flex items-center gap-2">
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
              <p className="text-sm leading-relaxed" style={{ color: '#7F8CAA' }}>
                Community engagement via SMS &amp; WhatsApp. Built for organisations that put people first.
              </p>
            </div>

            {/* Link columns */}
            <div className="flex gap-16 text-sm">
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#0f172a' }}
                >
                  Product
                </span>
                <a href="#features" className="transition-opacity hover:opacity-60" style={{ color: '#7F8CAA' }}>Features</a>
                <a href="#pricing" className="transition-opacity hover:opacity-60" style={{ color: '#7F8CAA' }}>Pricing</a>
                <Link to="/login" className="transition-opacity hover:opacity-60" style={{ color: '#7F8CAA' }}>Log in</Link>
                <Link to="/signup" className="transition-opacity hover:opacity-60" style={{ color: '#7F8CAA' }}>Sign up</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#0f172a' }}
                >
                  Legal
                </span>
                <Link to="/privacy" className="transition-opacity hover:opacity-60" style={{ color: '#7F8CAA' }}>Privacy Policy</Link>
                <Link to="/terms" className="transition-opacity hover:opacity-60" style={{ color: '#7F8CAA' }}>Terms of Service</Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTopColor: '#7F8CAA18', borderTopWidth: 1, borderTopStyle: 'solid' }}
          >
            <p className="text-xs" style={{ color: '#7F8CAA' }}>
              &copy; {new Date().getFullYear()} OpenComms. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link to="/privacy" className="text-xs transition-opacity hover:opacity-60" style={{ color: '#7F8CAA' }}>Privacy</Link>
              <Link to="/terms" className="text-xs transition-opacity hover:opacity-60" style={{ color: '#7F8CAA' }}>Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
