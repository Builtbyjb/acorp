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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex gap-8">{logo}</div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <DownloadButton>Download App</DownloadButton>
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
            <div className="flex flex-col gap-3 pt-2">
              <DownloadButton>Download App</DownloadButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
