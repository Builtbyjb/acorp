import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Pricing", href: "#pricing" },
];

function ZendoLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="13" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx="14" cy="14" r="5" fill="hsl(var(--primary))" />
      <line x1="14" y1="1" x2="14" y2="7"  stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="21" x2="14" y2="27" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <line x1="1"  y1="14" x2="7"  y2="14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="14" x2="27" y2="14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
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
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-200",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <ZendoLogo />
        <span className="font-bold text-lg tracking-tight text-foreground">
          Zendo
        </span>
      </Link>

      {/* Centre links */}
      <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign in
        </Link>
        <Button asChild size="sm" className="rounded-full px-5 shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
          <Link to="/signup">Get started free</Link>
        </Button>
      </div>
    </header>
  );
}
