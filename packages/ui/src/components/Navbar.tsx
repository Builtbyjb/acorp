import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { ArrowRight } from "lucide-react";

type NavLink = {
  label: string;
  to: string;
};

type Props = {
  navLinks: NavLink[];
  logo: ReactNode;
  enableCTA?: boolean;
};

export default function Navbar({ navLinks, logo, enableCTA = true }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex gap-8">
          {logo}

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to || currentPath.startsWith(link.to + "/");
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-3 py-1.5 text-sm font-medium rounded-full transition-all"
                  style={{ color: isActive ? "#0f172a" : "#7F8CAA" }}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full" style={{ backgroundColor: "#7F8CAA18" }} />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop CTAs */}
        {enableCTA && (
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/login" })}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
              style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
            >
              Log in
            </button>
            <button
              onClick={() => navigate({ to: "/signup" })}
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
            >
              Get started <ArrowRight />
            </button>
          </div>
        )}

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 -m-2 transition-colors rounded-lg"
          style={{ color: "#7F8CAA" }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 text-sm font-medium rounded-full transition-all"
                  style={{
                    color: isActive ? "#0f172a" : "#7F8CAA",
                    backgroundColor: isActive ? "#7F8CAA18" : "transparent",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {enableCTA && (
              <div className="flex flex-col gap-3 pt-4 mt-2 border-t" style={{ borderColor: "#7F8CAA22" }}>
                <button
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
                  style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate({ to: "/login" });
                  }}
                >
                  Log in
                </button>
                <button
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate({ to: "/signup" });
                  }}
                >
                  Get started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
