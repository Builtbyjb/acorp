import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import type { NavLink } from "@/lib/types";

type Props = {
  navLinks: NavLink[];
  logo: React.ReactNode;
  enableCTA?: boolean;
};

export default function Navbar({ navLinks, logo, enableCTA = true }: Props) {
  void enableCTA;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-400/30 backdrop-blur-md">
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
                  className="relative px-3 py-1.5 text-sm font-medium transition-all"
                  style={{ color: isActive ? "#000000" : "#737373" }}
                >
                  {isActive && <span className="absolute inset-0" style={{ backgroundColor: "#00000008" }} />}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop CTAs */}
        {/*{enableCTA && (
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate({ to: "/login" })}>
              Log in
            </Button>
            <a href="mailto:hello@acorp.app">
              <Button>
                Get started <ArrowRight />
              </Button>
            </a>
          </div>
        )}*/}

        {/* Mobile toggle */}
        <Button
          type="button"
          variant="outline"
          className="md:hidden p-2 -m-2 transition-colors text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 text-sm font-medium transition-all"
                  style={{
                    color: isActive ? "#000000" : "#737373",
                    backgroundColor: isActive ? "#00000008" : "transparent",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {/*{enableCTA && (
              <>
                <Separator className="my-2 bg-black/10" />
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
                  <a href="mailto:hello@acorp.app">
                    <Button>Get started</Button>
                  </a>
                </div>
              </>
            )}*/}
          </div>
        </div>
      )}
    </header>
  );
}
