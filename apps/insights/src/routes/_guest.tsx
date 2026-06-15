import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

// ── Icons ─────────────────────────────────────────────

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

// ── Nav ───────────────────────────────────────────────

function Nav() {
  const { location } = useRouterState();
  const path = location.pathname;

  const navLinks = [
    { label: "Features", href: "/#features", isAnchor: true },
    { label: "Pricing", to: "/pricing" as const },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: "#ebf0f0e8", borderColor: "#7F8CAA22" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black group-hover:scale-95 transition-transform"
            style={{ backgroundColor: "#4382df" }}
          >
            I
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: "#0f172a" }}>
            Insights
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.isAnchor) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
                  style={{ color: "#7F8CAA" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#7F8CAA")}
                >
                  {link.label}
                </a>
              );
            }
            const isActive = link.to ? path === link.to || path.startsWith(link.to + "/") : false;
            return (
              <Link
                key={link.label}
                to={link.to as any}
                className="relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
                style={{ color: isActive ? "#0f172a" : "#7F8CAA" }}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "#7F8CAA18" }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <Link
            to={"/login/" as any}
            className="px-5 py-2 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
            style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
          >
            Log in
          </Link>
          <Link
            to={"/signup/" as any}
            className="group inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#4382df", boxShadow: "0 4px 16px #4382df35" }}
          >
            Get started <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </header>
  );
}

// ── Footer ────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Changelog", href: "#" },
        { label: "Roadmap", href: "#" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ];

  return (
    <footer style={{ borderTop: "1px solid #7F8CAA20", backgroundColor: "#ebf0f0" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Main row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand block */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
                style={{ backgroundColor: "#4382df" }}
              >
                I
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ color: "#0f172a" }}>
                Insights
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
              Monitoring and evaluation for organizations that care about impact.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#0f172a" }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-opacity hover:opacity-60"
                      style={{ color: "#7F8CAA" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid #7F8CAA18" }}
        >
          <p className="text-xs" style={{ color: "#7F8CAA" }}>
            © {year} ACorp. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs transition-opacity hover:opacity-60"
                style={{ color: "#7F8CAA" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Layout ────────────────────────────────────────────

function GuestLayout() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#ebf0f0" }}>
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});
