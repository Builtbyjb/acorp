import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

// ── Nav ───────────────────────────────────────────────

function Nav() {
  const { location } = useRouterState();
  const path = location.pathname;

  const navLinks = [
    { label: "Features", href: "/#features", isAnchor: true },
    { label: "Pricing", to: "/pricing" as const },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#f8f9fb]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Wordmark */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-black text-white transition-transform group-hover:scale-95">
            I
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Insights</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            if (link.isAnchor) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
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
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden h-9 items-center justify-center rounded-full border border-slate-200 bg-white/70 px-5 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
    <footer className="border-t border-slate-200/60 bg-[#f8f9fb]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Main row */}
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand block */}
          <div className="md:col-span-1">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-black text-white">
                I
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">Insights</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Monitoring and evaluation for organizations that care about impact.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-900"
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
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200/60 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">© {year} ACorp. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-slate-400 transition-colors hover:text-slate-900"
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
    <div className="flex min-h-screen flex-col bg-[#f8f9fb]">
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
