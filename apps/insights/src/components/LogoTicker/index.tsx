import { LOGOS } from "@/lib/store/home";

function AnimatedTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden marquee-mask py-6">
      <div className="animate-marquee-h flex w-max items-center gap-12">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="text-sm font-medium tracking-tight text-slate-400 whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LogoTicker() {
  return (
    <section className="border-y border-slate-200/60 bg-white/50">
      <div className="mx-auto max-w-7xl px-6">
        <p className="pt-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          Trusted by leading impact organizations
        </p>
        <AnimatedTicker items={LOGOS} />
      </div>
    </section>
  );
}
