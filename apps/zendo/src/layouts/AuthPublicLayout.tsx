import { Link, Outlet } from "@tanstack/react-router";

export function AuthPublicLayout() {
  return (
    <div className="min-h-svh flex flex-col relative overflow-hidden bg-zendo-cream">
      {/* Soft background glow */}
      <div aria-hidden="true" className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-zendo-coral/10 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-zendo-sky/10 blur-[100px] pointer-events-none" />

      {/* Minimal header */}
      <header className="relative h-14 flex items-center px-6 border-b border-zendo-ink/10 bg-white/50 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black bg-gradient-to-br from-zendo-coral to-amber-400 shadow-sm transition-transform group-hover:scale-95">
            Z
          </div>
          <span className="font-bold text-base tracking-tight text-zendo-ink">
            Zendo
          </span>
        </Link>
      </header>

      {/* Centred form area */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </main>

      <footer className="relative h-12 flex items-center justify-center border-t border-zendo-ink/10 bg-white/50 backdrop-blur-sm">
        <p className="text-xs text-zendo-ink/40">
          © {new Date().getFullYear()} Zendo
        </p>
      </footer>
    </div>
  );
}

export default AuthPublicLayout;
