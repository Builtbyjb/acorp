import { useNavigate } from "@tanstack/react-router";

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

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Dark CTA block */}
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          {/* Radial glow layer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
            }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            {/* Eyebrow */}
            <p
              className="animate-fade-up text-xs font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#4382df", animationDelay: "0.05s" }}
            >
              Get started today
            </p>

            {/* Headline */}
            <h2
              className="animate-fade-up font-extrabold text-white tracking-tight mb-5"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: "1",
                animationDelay: "0.12s",
              }}
            >
              Ready to get paid faster?
              <br />
              <span style={{ WebkitTextStroke: "2px #4382df", WebkitTextFillColor: "transparent" }}>
                Start free, upgrade anytime.
              </span>
            </h2>

            {/* Subtext */}
            <p
              className="animate-fade-up text-base mb-10 max-w-lg mx-auto leading-relaxed"
              style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
            >
              No credit card required. Free forever for up to 5 invoices per month. Upgrade when your business grows.
            </p>

            {/* CTA */}
            <div
              className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ animationDelay: "0.32s" }}
            >
              <button
                onClick={() => navigate({ to: "/signup" })}
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
              >
                Create your first invoice <ArrowRight />
              </button>
              <button
                onClick={() => navigate({ to: "/pricing" })}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/10 active:scale-95"
                style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
              >
                View pricing
              </button>
            </div>

            {/* Supporting chips */}
            <div
              className="animate-fade-up flex flex-wrap items-center justify-center gap-3 mt-8"
              style={{ animationDelay: "0.42s" }}
            >
              {["Setup in under 2 minutes", "PDF download included", "Cancel anytime"].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
                  style={{
                    backgroundColor: "#ffffff08",
                    borderColor: "#7F8CAA25",
                    color: "#7F8CAA",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
