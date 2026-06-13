import { Link } from "@tanstack/react-router";
import { getCurrentYear } from "@shared/utils/util";

const footerLinks = {
  Product: [
    { name: "Pricing", href: "/pricing" },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Terms", href: "/terms-of-service" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "#7F8CAA20" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main row */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          {/* Brand block */}
          <div className="md:col-span-3">
            <Link to="/" className="group flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black transition-transform group-hover:scale-95"
                style={{ backgroundColor: "#4382df" }}
              >
                A
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ color: "#0f172a" }}>
                Corp
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#7F8CAA" }}>
              The simplest way to create professional invoices and get paid faster. Built for freelancers and growing businesses.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-1">
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#0f172a" }}
              >
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm transition-opacity hover:opacity-60"
                      style={{ color: "#7F8CAA" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "#7F8CAA18" }}
        >
          <p className="text-xs" style={{ color: "#7F8CAA" }}>
            {`© ${getCurrentYear()} ACorp. All rights reserved.`}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-xs transition-opacity hover:opacity-60"
              style={{ color: "#7F8CAA" }}
            >
              Privacy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-xs transition-opacity hover:opacity-60"
              style={{ color: "#7F8CAA" }}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
