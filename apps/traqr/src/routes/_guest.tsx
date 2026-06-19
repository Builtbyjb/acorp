import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TraqrLogo } from "@/components/brand/logo";
import { GrainOverlay } from "@/components/brand/grain-overlay";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

// ─── Navigation ────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Use cases", href: "/#use-cases" },
  { label: "Pricing", href: "/pricing" },
];

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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-muted rounded-lg transition-colors hover:text-slate-ink hover:bg-slate-border"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href as "/pricing"}
                  className="px-4 py-2 text-sm font-medium text-slate-muted rounded-lg transition-colors hover:text-slate-ink hover:bg-slate-border"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Auth CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-muted rounded-lg transition-colors hover:text-slate-ink hover:bg-slate-border"
            >
              Sign in
            </Link>
            <Button asChild size="sm">
              <Link to="/signup" className="group">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
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
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-slate-ink rounded-lg hover:bg-slate-border transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href as "/pricing"}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-slate-ink rounded-lg hover:bg-slate-border transition-colors"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <div className="mt-3 pt-3 border-t border-slate-border flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-slate-muted rounded-lg hover:bg-slate-border transition-colors"
                >
                  Sign in
                </Link>
                <Button asChild>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>
          </Container>
        </motion.div>
      )}
    </motion.header>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Use cases", href: "/#use-cases" },
    { label: "Pricing", href: "/pricing" },
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

// ─── Layout ────────────────────────────────────────────────────────────────

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
