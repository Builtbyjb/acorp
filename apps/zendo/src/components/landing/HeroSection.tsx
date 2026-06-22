import { DownloadAppButton } from "@/components/landing/DownloadAppButton";
import { ProductMockup } from "./ProductMockup";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-16 md:pt-24 pb-28 px-6 overflow-hidden bg-zendo-cream">
      {/* Soft gradient orbs */}
      <div
        aria-hidden="true"
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-zendo-coral/10 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-[10%] right-[-5%] w-[420px] h-[420px] rounded-full bg-zendo-sky/15 blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full bg-zendo-butter/20 blur-[100px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          {/* Eyebrow label */}
          <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <span className="eyebrow">
              <Sparkles size={14} />
              Calm productivity, finally
            </span>
          </div>

          {/* Display headline */}
          <h1
            className="animate-fade-up text-[clamp(3.5rem,9vw,5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-zendo-ink"
            style={{ animationDelay: "0.12s" }}
          >
            Your day, designed for focus.
            <br className="hidden sm:block" />
            <span></span>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up text-lg md:text-xl max-w-2xl leading-relaxed text-zendo-ink-light"
            style={{ animationDelay: "0.22s" }}
          >
            Drag tasks onto a beautiful calendar, chip away at them with a built-in Pomodoro timer, and actually get
            things done — without the stress.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up flex flex-wrap gap-3 justify-center" style={{ animationDelay: "0.32s" }}>
            <DownloadAppButton className="btn-solid group shadow-xl shadow-zendo-coral/25">
              Download App
            </DownloadAppButton>
          </div>

          {/* Supporting chips */}
          <div className="animate-fade-up flex flex-wrap justify-center gap-3" style={{ animationDelay: "0.48s" }}>
            {["No credit card required", "Free plan always available", "Cancel anytime"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zendo-ink-light bg-white border border-zendo-ink/10 rounded-full shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zendo-sage" />
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Product mockup */}
        <div
          className="animate-fade-up relative w-full max-w-5xl mx-auto mt-16 md:mt-20"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-b from-zendo-coral/10 via-zendo-sky/10 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none" />
          <ProductMockup />
        </div>
      </div>
    </section>
  );
}
