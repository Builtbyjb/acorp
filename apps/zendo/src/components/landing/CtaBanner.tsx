import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

function ArrowRight({ size = 16 }: { size?: number }) {
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

export function CtaBanner() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden px-8 md:px-16 py-20 text-center bg-zendo-ink">
          {/* Soft gradient glows */}
          <div
            aria-hidden="true"
            className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] rounded-full bg-zendo-coral/20 blur-[120px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full bg-zendo-sky/20 blur-[120px] pointer-events-none"
          />

          <div className="relative">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-zendo-butter bg-zendo-butter/10 rounded-full mb-6">
              <Sparkles size={14} />
              Your next focus session starts now
            </p>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Stop planning to be productive.
              <br />
              <span className="text-3xl">Start being it.</span>
            </h2>
            <p className="text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed text-white/70">
              Join thousands of focused builders using Zendo to ship more and stress less.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-bold bg-zendo-coral text-white transition-all hover:bg-zendo-coral/90 hover:gap-3 active:scale-95 rounded-full shadow-xl shadow-zendo-coral/25"
              >
                Get started free <ArrowRight />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold border-2 border-white/20 text-white transition-all hover:bg-white hover:text-zendo-ink active:scale-95 rounded-full"
              >
                View pricing
              </a>
            </div>

            <p className="text-xs mt-6 text-white/50">Free plan forever · Pro trial, no card needed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
