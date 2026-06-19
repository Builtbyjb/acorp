import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I've tried every productivity app out there. Zendo is the first one that actually stuck. Having the calendar and Pomodoro timer in the same place changed everything for me.",
    name: "Amara Osei",
    role: "Product Designer · Freelance",
    initials: "AO",
    color: "coral" as const,
  },
  {
    quote:
      "Our whole engineering team switched to Zendo for sprint planning. Dragging tasks onto the calendar during standup is so much faster than updating a board.",
    name: "Tom Hernandez",
    role: "Engineering Lead · Loom",
    initials: "TH",
    color: "sage" as const,
  },
  {
    quote:
      "The focus sessions feature keeps me honest. I used to kid myself I was working — now I have hard data on where my hours actually go.",
    name: "Priya Ramesh",
    role: "Senior Writer · Substack",
    initials: "PR",
    color: "sky" as const,
  },
];

const colorStyles = {
  coral: "bg-zendo-coral-light text-zendo-coral",
  sage: "bg-zendo-sage-light text-zendo-sage",
  sky: "bg-zendo-sky-light text-zendo-sky",
};

function StarRow() {
  return (
    <div className="flex gap-0.5 text-zendo-butter" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="currentColor">
          <path d="M7 1l1.5 4h4.3l-3.5 2.5 1.3 4L7 9 3.4 11.5l1.3-4L1.2 5H5.5z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-zendo-butter/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4">Real people, real focus</p>
          <h2 className="section-heading">
            Loved by focused builders.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="animate-fade-up group flex flex-col gap-5 p-8 rounded-[2rem] bg-white border border-zendo-ink/8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zendo-ink/5"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <StarRow />
                <Quote size={20} className="text-zendo-ink/10" />
              </div>
              <p className="text-[15px] leading-relaxed flex-1 text-zendo-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-zendo-ink/8">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0", colorStyles[t.color])}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-zendo-ink">
                    {t.name}
                  </p>
                  <p className="text-xs text-zendo-ink-light">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
