import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";

function Nav() {
  const { pathname } = useLocation();

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: "#ebf0f0e8", borderColor: "#7F8CAA22" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black transition-transform group-hover:scale-95"
            style={{ backgroundColor: "#4382df" }}
          >
            A
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: "#0f172a" }}>
            Corp
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <NavLink to="/" label="Home" active={pathname === "/"} />
          <NavLink to="/products" label="Products" active={pathname === "/products"} />
          <NavLink to="/custom" label="Custom" active={pathname === "/custom"} />
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium transition-opacity hover:opacity-60" style={{ color: "#7F8CAA" }}>
            Sign In
          </button>
          <button
            className="px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90 hover:shadow-md active:scale-95"
            style={{ backgroundColor: "#4382df", boxShadow: "0 2px 12px #4382df30" }}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className="relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
      style={{ color: active ? "#0f172a" : "#7F8CAA" }}
    >
      {active && <span className="absolute inset-0 rounded-full" style={{ backgroundColor: "#7F8CAA18" }} />}
      <span className="relative">{label}</span>
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t px-6 py-10" style={{ borderColor: "#7F8CAA20" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black"
              style={{ backgroundColor: "#4382df" }}
            >
              A
            </div>
            <span className="font-bold text-base tracking-tight" style={{ color: "#0f172a" }}>
              Corp
            </span>
          </Link>
          <p className="text-xs mt-2 max-w-xs leading-relaxed" style={{ color: "#7F8CAA" }}>
            A suite of purposeful tools built for how modern teams actually work.
          </p>
        </div>

        <div className="flex items-start gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0f172a" }}>
              Products
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Invoice", href: "#" },
                { label: "Zendo", href: "#" },
                { label: "OpenComms", href: "#" },
              ].map((p) => (
                <li key={p.label}>
                  <a href={p.href} className="text-sm transition-opacity hover:opacity-60" style={{ color: "#7F8CAA" }}>
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0f172a" }}>
              Company
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Custom Dev", to: "/custom" },
                { label: "About", href: "#" },
                { label: "Contact", href: "#" },
              ].map((p) => (
                <li key={p.label}>
                  {"to" in p ? (
                    <Link
                      to={p.to as "/custom"}
                      className="text-sm transition-opacity hover:opacity-60"
                      style={{ color: "#7F8CAA" }}
                    >
                      {p.label}
                    </Link>
                  ) : (
                    <a
                      href={p.href}
                      className="text-sm transition-opacity hover:opacity-60"
                      style={{ color: "#7F8CAA" }}
                    >
                      {p.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto mt-8 pt-6 border-t flex items-center justify-between"
        style={{ borderColor: "#7F8CAA18" }}
      >
        <p className="text-xs" style={{ color: "#7F8CAA" }}>
          © {new Date().getFullYear()} ACorp. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="text-xs transition-opacity hover:opacity-60" style={{ color: "#7F8CAA" }}>
            Privacy
          </Link>
          <Link to="/terms" className="text-xs transition-opacity hover:opacity-60" style={{ color: "#7F8CAA" }}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

function GuestLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#ebf0f0" }}>
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

/*
 * Routes that do not require a user to be authenticated
 */
export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});
