import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA16 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#4382df" }}>
              Get started today
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
              Start with one.
              <br />
              <span style={{ color: "#7F8CAA" }}>Stay for the suite.</span>
            </h2>
            <p className="text-base mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: "#7F8CAA" }}>
              Each product is powerful on its own — but they're designed to work together, so your tools grow as your
              needs do.
            </p>
            <Link to="/products">
              <button
                className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "#4382df",
                  boxShadow: "0 4px 24px #4382df40",
                }}
              >
                Explore the suite
                <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
