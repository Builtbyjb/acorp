export default function LogoStrip() {
  const logos = [
    "TikTok Studios",
    "Reels Agency",
    "Shorts Collective",
    "Pulse Media",
    "Nova Creators",
    "Frame Labs",
    "Orbit Films",
  ];

  return (
    <section className="relative border-y py-8 bg-surface border-border">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[#030305] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[#030305] to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-6 text-xs font-semibold uppercase tracking-widest text-[#8a8a9a]">
        <span className="hidden shrink-0 md:block">Trusted by teams at</span>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee items-center gap-12 whitespace-nowrap pr-12">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="text-[#8a8a9a]/60">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
