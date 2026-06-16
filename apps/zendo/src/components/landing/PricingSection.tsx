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
      stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5l2.5 2.5L8 2.5" />
    </svg>
  );
}

function CheckMuted() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    <section id="pricing" className="pb-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="eyebrow mb-2.5">
            Simple pricing
          </p>
          <h2 className="section-heading">
            Start free. Upgrade when ready.
          </h2>
          <p className="text-lg max-w-xl leading-relaxed mt-3 text-neutral-500">
            No surprise fees. Cancel any time. Your data is always yours.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          {/* Free */}
          <div
            className="animate-fade-up receipt-card p-10 flex flex-col gap-6"
            style={{ animationDelay: "0.1s" }}
          >
            <div>
              <p className="eyebrow mb-4">
                Free
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight text-black">
                  $0
                </span>
                <span className="text-sm text-neutral-500">/month</span>
              </div>
              <p className="text-sm mt-1 text-neutral-500">
                Perfect for individuals getting started.
              </p>
            </div>

            <div className="pt-6 border-t border-black/10">
              <ul className="flex flex-col gap-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-black">
                    <span className="w-4 h-4 rounded-none flex items-center justify-center flex-shrink-0 bg-neutral-100">
                      <CheckMuted />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/signup"
              className="btn-outline mt-auto justify-center rounded-none"
            >
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div
            className="animate-fade-up receipt-card p-10 flex flex-col gap-6 relative border-2 border-black"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Most popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-black rounded-none">
                <span className="w-1.5 h-1.5 rounded-none bg-white/60 animate-pulse" />
                Most popular
              </span>
            </div>

            <div className="pt-2">
              <p className="eyebrow mb-4 text-black">
                Pro
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg self-start mt-2 text-neutral-500">$</span>
                <span className="text-5xl font-extrabold tracking-tight text-black">5</span>
                <span className="text-sm text-neutral-500">/month</span>
              </div>
              <p className="text-sm mt-1 text-neutral-500">
                For serious makers who want every edge.
              </p>
            </div>

            <div className="pt-6 border-t border-black/10">
              <ul className="flex flex-col gap-3">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-black">
                    <span className="w-4 h-4 rounded-none flex items-center justify-center flex-shrink-0 bg-neutral-100">
                      {f === "Everything in Free" ? <CheckMuted /> : <Check />}
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/signup"
              className="btn-solid group mt-auto justify-center rounded-none"
            >
              Start Pro free for 14 days <ArrowRight />
            </Link>
          </div>
        </div>

        <p className="text-xs mt-6 text-neutral-500">
          Pro trial requires no credit card. Billed monthly after trial ends. Cancel any time.
        </p>
      </div>
    </section>
  );
}
