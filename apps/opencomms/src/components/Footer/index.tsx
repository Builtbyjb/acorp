import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock } from "lucide-react";

type Item = {
  label: string;
  to: string;
};

type FooterItem = {
  title: string;
  items: Item[];
};

type Props = {
  footerItems: FooterItem[];
  logo: React.ReactNode;
  description: string;
};

export default function Footer({ footerItems, logo, description }: Props) {
  return (
    <footer className="border-t border-border/60 bg-card px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="max-w-sm">
            {logo}
            <p className="text-sm mt-3 leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Shield className="h-3 w-3" />
                GDPR ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Lock className="h-3 w-3" />
                Encrypted at rest
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {footerItems.map((footerItem, idx) => (
              <div key={idx}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3 text-foreground">
                  {footerItem.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {footerItem.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        to={item.to}
                        className="text-sm transition-colors hover:text-primary text-muted-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-border/60" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground">
          <p className="text-xs">
            © {new Date().getFullYear()} OpenComms. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs hover:text-primary transition-colors">
              Terms
            </Link>
          <Link to="/" className="text-xs hover:text-primary transition-colors">
            Security
          </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
