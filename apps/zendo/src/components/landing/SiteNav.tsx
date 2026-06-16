import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-200"
      style={{
        backgroundColor: scrolled ? "#ebf0f0e8" : "#ebf0f0cc",
        borderColor: "#7F8CAA22",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black transition-transform group-hover:scale-95"
            style={{ backgroundColor: "#4382df" }}
          >
            Z
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: "#0f172a" }}>
            Zendo
          </span>
        </Link>

        {/* Centre links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => (
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
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:block text-sm font-medium transition-opacity hover:opacity-60"
            style={{ color: "#7F8CAA" }}
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
            style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
          >
            Get started free <ArrowRight />
          </Link>
        </div>
      </div>
    </header>
  );
}
