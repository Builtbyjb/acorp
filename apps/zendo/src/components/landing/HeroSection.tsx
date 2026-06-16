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
    <section className="relative pt-20 pb-28 px-6 overflow-hidden bg-white">
      {/* Dot-matrix background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-dot-matrix opacity-30"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          {/* Eyebrow label */}
          <div
            className="animate-fade-up eyebrow border border-black/10 px-3 py-2"
            style={{ animationDelay: "0.05s" }}
          >
            Calm productivity, finally
          </div>

          {/* Display headline */}
          <h1
            className="animate-fade-up text-[clamp(3rem,8vw,6rem)] font-extrabold tracking-[-0.04em] leading-[0.92] text-black"
            style={{ animationDelay: "0.12s" }}
          >
            Your day,{" "}
            <br className="hidden sm:block" />
            <span className="text-outline">
              designed for focus.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up text-lg max-w-xl leading-relaxed text-neutral-500"
            style={{ animationDelay: "0.22s" }}
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
              className="btn-solid group rounded-none"
            >
              Get started free <ArrowRight />
            </Link>
            <a
              href="#preview"
              className="btn-outline rounded-none"
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
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold border border-black/10 text-neutral-500 bg-white rounded-none"
              >
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
