import { Link, Outlet } from "@tanstack/react-router";

function ZendoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="13" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx="14" cy="14" r="5" fill="hsl(var(--primary))" />
      <line x1="14" y1="1"  x2="14" y2="7"  stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="21" x2="14" y2="27" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <line x1="1"  y1="14" x2="7"  y2="14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="14" x2="27" y2="14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AuthPublicLayout() {
  return (
    <div className="min-h-svh bg-background flex flex-col">
      {/* Minimal header */}
      <header className="h-14 flex items-center px-6 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <ZendoMark />
          <span className="font-bold text-base tracking-tight text-foreground">Zendo</span>
        </Link>
      </header>

      {/* Centred form area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </main>

      <footer className="h-12 flex items-center justify-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zendo
        </p>
      </footer>
    </div>
  );
}

export default AuthPublicLayout;
