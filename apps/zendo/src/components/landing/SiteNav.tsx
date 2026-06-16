import { Link } from "@tanstack/react-router";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Pricing", href: "#pricing" },
];

function ArrowRight({ size = 14 }: { size?: number }) {
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
  return (
    <header
      className="sticky top-0 z-50 border-b border-black/10 backdrop-blur-md transition-all duration-200 bg-white/90"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-7 h-7 rounded-none flex items-center justify-center bg-black text-white text-xs font-black transition-transform group-hover:scale-95">
            Z
          </div>
          <span className="font-bold text-lg tracking-tight text-black">
            Zendo
          </span>
        </Link>

        {/* Centre links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-3 py-1.5 text-sm font-medium transition-colors text-neutral-500 hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:block text-sm font-medium transition-opacity hover:opacity-60 text-neutral-500"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-black transition-all hover:bg-black/90 hover:gap-3 active:scale-95 rounded-none"
          >
            Get started free <ArrowRight />
          </Link>
        </div>
      </div>
    </header>
  );
}
