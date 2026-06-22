import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TraqrLogo } from "@/components/brand/logo";
import { GrainOverlay } from "@/components/brand/grain-overlay";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { DownloadButton } from "@/components/DownloadButton";

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-slate-border bg-slate-base/85 backdrop-blur-md"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <TraqrLogo color="#1a1c21" />
          </Link>

          {/* Auth CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <DownloadButton asChild size="sm">
              Download App
            </DownloadButton>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-ink hover:bg-slate-border transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile nav */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-slate-border bg-slate-paper"
        >
          <Container>
            <nav className="py-4 flex flex-col gap-1">
              <div className="mt-3 pt-3 border-t border-slate-border flex flex-col gap-2">
                <DownloadButton asChild>Download App</DownloadButton>
              </div>
            </nav>
          </Container>
        </motion.div>
      )}
    </motion.header>
  );
}

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Use cases", href: "/#use-cases" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
  ],
};

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-border bg-slate-paper">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <TraqrLogo color="#1a1c21" />
            </Link>
            <p className="text-slate-muted leading-relaxed max-w-sm">
              QR code management for warehouses, field service teams, and enterprise logistics. Track, scan, and deliver
              with confidence.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-ink mb-4">{category}</p>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-slate-muted transition-colors hover:text-scanner-dark"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-muted">© {year} Traqr, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-slate-muted">
            <span className="w-2 h-2 rounded-full bg-scanner animate-pulse-soft" />
            Systems operational
          </div>
        </div>
      </Container>
    </footer>
  );
}

function GuestLayout() {
  return (
    <div className="relative min-h-svh bg-slate-base">
      <GrainOverlay />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});
