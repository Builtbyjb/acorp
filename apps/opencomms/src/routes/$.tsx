import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from './-icons.tsx'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  const { _splat } = Route.useParams()

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: '#ebf0f0' }}
    >
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
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: '#4382df0a' }}
      />

      <div className="relative text-center animate-fade-up">
        <p
          className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
          style={{ color: '#7F8CAA' }}
        >
          Error
        </p>
        <h1
          className="font-extrabold tracking-tight mb-4"
          style={{
            fontSize: 'clamp(5rem, 18vw, 10rem)',
            letterSpacing: '-0.05em',
            color: '#0f172a',
            lineHeight: '0.85',
          }}
        >
          404
        </h1>
        <p
          className="text-xl font-bold tracking-tight mb-2"
          style={{ color: '#0f172a' }}
        >
          Page not found
        </p>
        <p className="text-sm mb-8" style={{ color: '#7F8CAA' }}>
          No route matches{' '}
          <code
            className="rounded-lg px-2 py-0.5 text-xs font-mono"
            style={{ backgroundColor: '#7F8CAA14', color: '#0f172a' }}
          >
            /{_splat}
          </code>
        </p>
        <Link
          to="/"
          className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#4382df', boxShadow: '0 4px 20px #4382df35' }}
        >
          Go home <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
