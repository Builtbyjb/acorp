import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5">
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

const FREE_FEATURES = [
  "Unlimited tasks",
  "Basic week-view calendar",
  "1 Pomodoro preset",
  "Up to 3 active projects",
  "Community support",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Google & Outlook calendar sync",
  "Custom Pomodoro sequences",
  "Unlimited projects",
  "Focus analytics & streaks",
  "Priority support",
  "Early access to new features",
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 bg-zendo-cream relative overflow-hidden">
      <div aria-hidden="true" className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-zendo-lavender/10 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute top-20 left-[-5%] w-[350px] h-[350px] rounded-full bg-zendo-sky/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4">Simple pricing</p>
          <h2 className="section-heading">
            Start free. Upgrade when ready.
          </h2>
          <p className="text-lg max-w-xl leading-relaxed mt-4 text-zendo-ink-light">
            No surprise fees. Cancel any time. Your data is always yours.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Free */}
          <div
            className="animate-fade-up p-10 flex flex-col gap-6 rounded-[2rem] bg-white border border-zendo-ink/8 shadow-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <div>
              <p className="eyebrow mb-4">Free</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight text-zendo-ink">
                  $0
                </span>
                <span className="text-sm text-zendo-ink-light">/month</span>
              </div>
              <p className="text-sm mt-2 text-zendo-ink-light">
                Perfect for individuals getting started.
              </p>
            </div>

            <div className="pt-6 border-t border-zendo-ink/10">
              <ul className="flex flex-col gap-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-zendo-ink">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-zendo-sage/15 text-zendo-sage">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/signup"
              className="btn-outline mt-auto justify-center"
            >
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div
            className="animate-fade-up p-10 flex flex-col gap-6 rounded-[2.5rem] bg-zendo-ink text-white shadow-2xl shadow-zendo-ink/20 relative"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Most popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-zendo-ink bg-zendo-butter rounded-full shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-zendo-coral animate-pulse" />
                Most popular
              </span>
            </div>

            <div className="pt-2">
              <p className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-zendo-coral bg-zendo-coral/10 rounded-full mb-4">
                Pro
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg self-start mt-2 text-white/60">$</span>
                <span className="text-5xl font-extrabold tracking-tight text-white">5</span>
                <span className="text-sm text-white/60">/month</span>
              </div>
              <p className="text-sm mt-2 text-white/70">
                For serious makers who want every edge.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <ul className="flex flex-col gap-3">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/90">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-zendo-coral/20 text-zendo-coral">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/signup"
              className="group mt-auto justify-center inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-zendo-ink bg-white transition-all hover:bg-zendo-cream hover:gap-3 active:scale-95 rounded-full shadow-lg"
            >
              Start Pro free for 14 days <ArrowRight />
            </Link>
          </div>
        </div>

        <p className="text-xs mt-6 text-zendo-ink-light">
          Pro trial requires no credit card. Billed monthly after trial ends. Cancel any time.
        </p>
      </div>
    </section>
  );
}
