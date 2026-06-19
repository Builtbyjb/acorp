import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Pricing", href: "#pricing" },
];

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 14 14"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zendo-ink/5 backdrop-blur-xl transition-all duration-200 bg-white/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-zendo-coral to-amber-400 text-white text-sm font-black shadow-lg shadow-zendo-coral/20 transition-transform group-hover:scale-95 group-hover:rotate-[-3deg]">
            Z
          </div>
          <span className="font-bold text-lg tracking-tight text-zendo-ink">
            Zendo
          </span>
        </Link>

        {/* Centre links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-inactive"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:block text-sm font-medium transition-colors hover:text-zendo-coral text-zendo-ink-light"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-zendo-ink transition-all hover:bg-zendo-ink/90 hover:gap-3 active:scale-95 rounded-full shadow-lg shadow-zendo-ink/10"
          >
            Get started free <ArrowRight />
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-full text-zendo-ink-light hover:bg-zendo-ink/5"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zendo-ink/5 bg-white/95 backdrop-blur-xl px-6 py-4">
          <nav className="flex flex-col gap-2" aria-label="Mobile primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-zendo-ink-light hover:text-zendo-ink hover:bg-zendo-coral/10 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <hr className="my-2 border-zendo-ink/10" />
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-sm font-medium text-zendo-ink-light hover:text-zendo-ink rounded-lg transition-colors"
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
