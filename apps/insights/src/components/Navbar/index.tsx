// import { useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { DownloadButton } from "@/components/DownloadButton";

type Props = {
  logo: React.ReactNode;
};

export default function Navbar({ logo }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const navigate = useNavigate();
  // const routerState = useRouterState();
  // const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex gap-8">{logo}</div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <DownloadButton>Download App</DownloadButton>
        </div>

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
        <div className="md:hidden border-t border-slate-200 bg-background">
          <div className="flex flex-col gap-1 px-6 py-4">
            <div className="flex flex-col gap-3 pt-2">
              <DownloadButton>Download App</DownloadButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
