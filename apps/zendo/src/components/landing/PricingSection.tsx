import { Link } from "@tanstack/react-router";

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5">
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      stroke="#4382df" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5l2.5 2.5L8 2.5" />
    </svg>
  );
}

function CheckMuted() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      stroke="#7F8CAA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5l2.5 2.5L8 2.5" />
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
    <section id="pricing" className="pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            Simple pricing
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Start free. Upgrade when ready.
          </h2>
          <p
            className="text-lg max-w-xl leading-relaxed mt-3"
            style={{ color: "#7F8CAA" }}
          >
            No surprise fees. Cancel any time. Your data is always yours.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          {/* Free */}
          <div
            className="animate-fade-up bg-white rounded-3xl p-10 flex flex-col gap-6"
            style={{
              boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
              animationDelay: "0.1s",
            }}
          >
            <div>
              <p
                className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ color: "#7F8CAA" }}
              >
                Free
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight" style={{ color: "#0f172a" }}>
                  $0
                </span>
                <span className="text-sm" style={{ color: "#7F8CAA" }}>/month</span>
              </div>
              <p className="text-sm mt-1" style={{ color: "#7F8CAA" }}>
                Perfect for individuals getting started.
              </p>
            </div>

            <div style={{ borderTop: "1px solid #7F8CAA18" }} className="pt-6">
              <ul className="flex flex-col gap-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "#0f172a" }}>
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#7F8CAA14" }}
                    >
                      <CheckMuted />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/signup"
              className="mt-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
              style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
            >
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div
            className="animate-fade-up bg-white rounded-3xl p-10 flex flex-col gap-6 relative"
            style={{
              boxShadow: "0 1px 4px #0f172a0a, 0 0 0 2px #4382df50",
              backgroundColor: "#ffffff",
              animationDelay: "0.2s",
            }}
          >
            {/* Most popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: "#4382df", boxShadow: "0 4px 12px #4382df35" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                Most popular
              </span>
            </div>

            <div className="pt-2">
              <p
                className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ color: "#4382df" }}
              >
                Pro
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg self-start mt-2" style={{ color: "#7F8CAA" }}>$</span>
                <span className="text-5xl font-extrabold tracking-tight" style={{ color: "#0f172a" }}>5</span>
                <span className="text-sm" style={{ color: "#7F8CAA" }}>/month</span>
              </div>
              <p className="text-sm mt-1" style={{ color: "#7F8CAA" }}>
                For serious makers who want every edge.
              </p>
            </div>

            <div style={{ borderTop: "1px solid #4382df28" }} className="pt-6">
              <ul className="flex flex-col gap-3">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "#0f172a" }}>
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#4382df14" }}
                    >
                      {f === "Everything in Free" ? <CheckMuted /> : <Check />}
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/signup"
              className="group mt-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
              style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
            >
              Start Pro free for 14 days <ArrowRight />
            </Link>
          </div>
        </div>

        <p className="text-xs mt-6" style={{ color: "#7F8CAA" }}>
          Pro trial requires no credit card. Billed monthly after trial ends. Cancel any time.
        </p>
      </div>
    </section>
  );
}
