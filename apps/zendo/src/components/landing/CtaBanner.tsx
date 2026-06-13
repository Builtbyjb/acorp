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

export function CtaBanner() {
  return (
    <section className="pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          {/* Radial glow layer */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
            }}
          />
          {/* Grid overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#4382df" }}
            >
              Your next focus session starts now
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              Stop planning to be productive.
              <br />
              <span style={{ color: "#7F8CAA" }}>Start being it.</span>
            </h2>
            <p
              className="text-base mb-10 max-w-lg mx-auto leading-relaxed"
              style={{ color: "#7F8CAA" }}
            >
              Join thousands of focused builders using Zendo to ship more and stress less.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
                style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
              >
                Get started free <ArrowRight />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/10 active:scale-95"
                style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
              >
                View pricing
              </a>
            </div>

            <p className="text-xs mt-6" style={{ color: "#4382df80" }}>
              Free plan forever · Pro trial, no card needed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
