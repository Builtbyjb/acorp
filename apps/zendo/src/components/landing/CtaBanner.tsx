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
        <div className="relative rounded-none overflow-hidden px-10 py-20 text-center bg-[#171717]">
          {/* Dot-matrix background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-dot-matrix opacity-20"
          />

          <div className="relative">
            <p className="eyebrow text-neutral-400 mb-4">
              Your next focus session starts now
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              Stop planning to be productive.
              <br />
              <span className="text-outline text-white">Start being it.</span>
            </h2>
            <p className="text-base mb-10 max-w-lg mx-auto leading-relaxed text-neutral-400">
              Join thousands of focused builders using Zendo to ship more and stress less.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold bg-white text-black transition-all hover:bg-white/90 hover:gap-3 active:scale-95 rounded-none"
              >
                Get started free <ArrowRight />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold border-2 border-white text-white transition-all hover:bg-white hover:text-black active:scale-95 rounded-none"
              >
                View pricing
              </a>
            </div>

            <p className="text-xs mt-6 text-neutral-500">
              Free plan forever · Pro trial, no card needed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
