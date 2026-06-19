import { Link } from "@tanstack/react-router";

const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" as const },
      { label: "Terms of Service", to: "/terms-of-service" as const },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Contact", href: "mailto:hello@zendo.app" },
    ],
  },
];

const SOCIALS = [
  { href: "https://github.com", label: "GitHub" },
  { href: "https://x.com", label: "X / Twitter" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-zendo-ink/8 bg-zendo-cream">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Main row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 no-underline group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-zendo-coral to-amber-400 text-white text-xs font-black shadow-md shadow-zendo-coral/20 transition-transform group-hover:scale-95">
                Z
              </div>
              <span className="font-bold text-base tracking-tight text-zendo-ink">
                Zendo
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[200px] text-zendo-ink-light">
              Calm, focused productivity. Calendar, tasks, and Pomodoro in one place.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-zendo-coral/10 hover:text-zendo-coral border border-zendo-ink/10 text-zendo-ink-light bg-white"
                >
                  {s.label === "GitHub" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-zendo-ink">
                {col.title}
              </p>
              {col.links.map((link) =>
                "to" in link ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm transition-colors hover:text-zendo-coral text-zendo-ink-light"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm transition-colors hover:text-zendo-coral text-zendo-ink-light"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 text-xs border-t border-zendo-ink/8 text-zendo-ink-light">
          <span>© {new Date().getFullYear()} Zendo. All rights reserved.</span>
          <span>Designed for focus. Built for humans.</span>
        </div>
      </div>
    </footer>
  );
}
