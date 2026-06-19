import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type NavLink = {
  label: string;
  to: string;
};

type Props = {
  navLinks: NavLink[];
  logo: React.ReactNode;
  enableCTA?: boolean;
};

export default function Navbar({ navLinks, logo, enableCTA = true }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex gap-8">
          {logo}

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.to || currentPath.startsWith(link.to + "/");
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-3 py-1.5 text-sm font-medium transition-all rounded-full text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-primary/10" />
                  )}
                  <span className={`relative ${isActive ? "text-primary font-semibold" : ""}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {enableCTA && (
            <>
              <Button variant="ghost" onClick={() => navigate({ to: "/login" })}>
                Log in
              </Button>
              <Button onClick={() => navigate({ to: "/signup" })}>
                Get started <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 text-sm font-medium transition-all rounded-lg ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {enableCTA && (
              <>
                <Separator className="my-2" />
                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate({ to: "/login" });
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate({ to: "/signup" });
                    }}
                  >
                    Get started
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
