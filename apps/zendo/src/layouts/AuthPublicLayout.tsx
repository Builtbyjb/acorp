import { Link, Outlet } from "@tanstack/react-router";

export function AuthPublicLayout() {
  return (
    <div className="min-h-svh flex flex-col relative overflow-hidden" style={{ backgroundColor: "#ebf0f0" }}>
      {/* Dot-grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df0e" }}
      />

      {/* Minimal header */}
      <header
        className="relative h-14 flex items-center px-6"
        style={{ borderBottom: "1px solid #7F8CAA22" }}
      >
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black"
            style={{ backgroundColor: "#4382df" }}
          >
            Z
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: "#0f172a" }}>
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

      <footer className="relative h-12 flex items-center justify-center">
        <p className="text-xs" style={{ color: "#7F8CAA" }}>
          © {new Date().getFullYear()} Zendo
        </p>
      </footer>
    </div>
  );
}

export default AuthPublicLayout;
