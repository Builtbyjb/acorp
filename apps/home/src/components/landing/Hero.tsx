import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@shared/ui/components/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-28">
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glows */}
      <div
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df10" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#7F8CAA14" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-10"
            style={{
              backgroundColor: "#ffffff70",
              borderColor: "#7F8CAA28",
              color: "#7F8CAA",
              animationDelay: "0.05s",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
            ACorp Suite
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up font-extrabold leading-[0.87] tracking-[-0.04em] mb-7"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              color: "#0f172a",
              animationDelay: "0.12s",
            }}
          >
            One suite.{" "}
            <span
              style={{
                WebkitTextStroke: "2.5px #4382df",
                color: "transparent",
              }}
            >
              Every need.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="animate-fade-up text-xl max-w-2xl leading-relaxed mb-12"
            style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
          >
            A carefully built collection of focused tools — each one crafted to eliminate friction and let you, your
            team, and your community do their best work.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up flex flex-wrap gap-3" style={{ animationDelay: "0.32s" }}>
            <Link to="/products">
              <Button
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
                style={{
                  backgroundColor: "#4382df",
                  boxShadow: "0 4px 20px #4382df35",
                }}
              >
                Explore Products
                <ArrowRight />
              </Button>
            </Link>
            <a href="#products">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
                style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
              >
                See what we build
              </button>
            </a>
          </div>
        </div>

        {/* Chips */}
        <div className="animate-fade-in mt-16 flex flex-wrap gap-3" style={{ animationDelay: "0.48s" }}>
          {["6 live products", "More in development", "Built for real workflows"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: "#ffffff90",
                borderColor: "#7F8CAA25",
                color: "#7F8CAA",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
