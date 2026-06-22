import { DownloadAppButton } from "@/components/landing/DownloadAppButton";

export default function FinalCTA() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border px-8 py-24 text-center md:px-16 bg-surface border-border">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 60%, rgba(34,211,238,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 40%, rgba(245,158,11,0.1) 0%, transparent 50%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Get started today</p>
            <h2
              className="mx-auto mb-6 max-w-3xl font-extrabold tracking-tight text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: "1",
              }}
            >
              Your first video
              <br />
              is on us.
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-[#8a8a9a]">
              No credit card. No learning curve. Just describe what you want and watch Lumina build it in seconds.
            </p>
            <DownloadAppButton
              size="lg"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-[#030305] shadow-[0_0_28px_rgba(255,255,255,0.2)] transition-all hover:gap-2.5 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] active:scale-95"
            >
              Download App
            </DownloadAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
