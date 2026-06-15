import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

// ─── Shared icon components ────────────────────────────────────────────────

export function TraqrIcon({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer QR finder square */}
      <rect
        x="1.5"
        y="1.5"
        width="13"
        height="13"
        rx="2.5"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Inner hollow square */}
      <rect
        x="4.5"
        y="4.5"
        width="7"
        height="7"
        rx="1"
        stroke={color}
        strokeWidth="1.25"
      />
      {/* Center tracking dot */}
      <circle cx="8" cy="8" r="1.5" fill={color} />
    </svg>
  );
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: "#ebf0f0e8", borderColor: "#7F8CAA22" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-95"
            style={{ backgroundColor: "#4382df" }}
          >
            <TraqrIcon size={15} color="white" />
          </div>
          <span
            className="font-bold text-lg tracking-tight"
            style={{ color: "#0f172a" }}
          >
            traqr
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Features", href: "/#features" },
            { label: "How It Works", href: "/#how-it-works" },
            { label: "Pricing", href: "/pricing" },
          ].map((link) =>
            link.href.startsWith("/#") ? (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium rounded-full transition-all hover:opacity-60"
                style={{ color: "#7F8CAA" }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href as "/pricing"}
                className="px-3 py-1.5 text-sm font-medium rounded-full transition-all hover:opacity-60"
                style={{ color: "#7F8CAA" }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Auth CTAs */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium transition-all hover:opacity-60"
            style={{ color: "#7F8CAA" }}
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
            style={{
              backgroundColor: "#4382df",
              boxShadow: "0 4px 20px #4382df35",
            }}
          >
            Get Started <ArrowRight />
          </Link>
        </div>
      </div>
    </header>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: "#7F8CAA20",
        backgroundColor: "#ebf0f0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Brand block */}
          <div className="max-w-xs">
            <Link to="/" className="group flex items-center gap-2.5 mb-4">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-95"
                style={{ backgroundColor: "#4382df" }}
              >
                <TraqrIcon size={15} color="white" />
              </div>
              <span
                className="font-bold text-lg tracking-tight"
                style={{ color: "#0f172a" }}
              >
                traqr
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#7F8CAA" }}
            >
              QR code management for businesses that need to track everything,
              everywhere.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#0f172a" }}
              >
                Product
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Features", href: "/#features" },
                  { label: "How It Works", href: "/#how-it-works" },
                  { label: "Pricing", href: "/pricing" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm transition-all hover:opacity-60"
                    style={{ color: "#7F8CAA" }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#0f172a" }}
              >
                Company
              </p>
              <div className="flex flex-col gap-3">
                {["About", "Blog", "Contact"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm transition-all hover:opacity-60"
                    style={{ color: "#7F8CAA" }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#0f172a" }}
              >
                Legal
              </p>
              <div className="flex flex-col gap-3">
                {["Privacy Policy", "Terms of Service"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm transition-all hover:opacity-60"
                    style={{ color: "#7F8CAA" }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "#7F8CAA18" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#7F8CAA" }}>
            © {year} Traqr, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#4382df" }}
            >
              <TraqrIcon size={9} color="white" />
            </div>
            <span className="text-xs font-medium" style={{ color: "#7F8CAA" }}>
              Built with precision.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Layout ────────────────────────────────────────────────────────────────

function GuestLayout() {
  return (
    <div style={{ backgroundColor: "#ebf0f0", minHeight: "100svh" }}>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});
