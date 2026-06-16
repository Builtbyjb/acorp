import { Link, Outlet } from "@tanstack/react-router";

export function AuthPublicLayout() {
  return (
    <div className="min-h-svh flex flex-col relative overflow-hidden bg-white bg-dot-matrix">
      {/* Minimal header */}
      <header className="relative h-14 flex items-center px-6 border-b border-black/10">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-6 h-6 flex items-center justify-center text-white text-xs font-black bg-black">
            Z
          </div>
          <span className="font-bold text-base tracking-tight text-black">
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

      <footer className="relative h-12 flex items-center justify-center border-t border-black/10">
        <p className="text-xs text-black/40">
          © {new Date().getFullYear()} Zendo
        </p>
      </footer>
    </div>
  );
}

export default AuthPublicLayout;
