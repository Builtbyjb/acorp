import { Link } from "@tanstack/react-router";
import { ProductMockup } from "./ProductMockup";

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 14 14"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-28 px-6 overflow-hidden">
      {/* Dot-grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow — cobalt top-right */}
      <div
        aria-hidden="true"
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df10" }}
      />
      {/* Ambient glow — slate bottom-left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#7F8CAA14" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          {/* Eyebrow pill */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase"
            style={{
              backgroundColor: "#ffffff70",
              borderColor: "#7F8CAA28",
              color: "#7F8CAA",
              animationDelay: "0.05s",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
            Calm productivity, finally
          </div>

          {/* Display headline */}
          <h1
            className="animate-fade-up text-[clamp(3rem,8vw,6rem)] font-extrabold tracking-[-0.04em] leading-[0.92]"
            style={{ color: "#0f172a", animationDelay: "0.12s" }}
          >
            Your day,{" "}
            <br className="hidden sm:block" />
            <span style={{ WebkitTextStroke: "2px #4382df", color: "transparent" }}>
              designed for focus.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up text-lg max-w-xl leading-relaxed"
            style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
          >
            Drag tasks onto a beautiful calendar, chip away at them with a built-in
            Pomodoro timer, and actually get things done.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up flex flex-wrap gap-3 justify-center"
            style={{ animationDelay: "0.32s" }}
          >
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
              style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
            >
              Get started free <ArrowRight />
            </Link>
            <a
              href="#preview"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
              style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
            >
              See it in action
            </a>
          </div>

          {/* Supporting chips */}
          <div
            className="animate-fade-up flex flex-wrap justify-center gap-3"
            style={{ animationDelay: "0.48s" }}
          >
            {["No credit card required", "Free plan always available", "Cancel anytime"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
                style={{ backgroundColor: "#ffffff90", borderColor: "#7F8CAA25", color: "#7F8CAA" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Product mockup */}
        <div
          className="animate-fade-up relative w-full max-w-5xl mx-auto mt-20"
          style={{ animationDelay: "0.6s" }}
        >
          <ProductMockup />
        </div>
      </div>
    </section>
  );
}
