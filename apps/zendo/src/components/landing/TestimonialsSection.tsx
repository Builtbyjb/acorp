const TESTIMONIALS = [
  {
    quote:
      "I've tried every productivity app out there. Zendo is the first one that actually stuck. Having the calendar and Pomodoro timer in the same place changed everything for me.",
    name: "Amara Osei",
    role: "Product Designer · Freelance",
    initials: "AO",
  },
  {
    quote:
      "Our whole engineering team switched to Zendo for sprint planning. Dragging tasks onto the calendar during standup is so much faster than updating a board.",
    name: "Tom Hernandez",
    role: "Engineering Lead · Loom",
    initials: "TH",
  },
  {
    quote:
      "The focus sessions feature keeps me honest. I used to kid myself I was working — now I have hard data on where my hours actually go.",
    name: "Priya Ramesh",
    role: "Senior Writer · Substack",
    initials: "PR",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
          <path d="M7 1l1.5 4h4.3l-3.5 2.5 1.3 4L7 9 3.4 11.5l1.3-4L1.2 5H5.5z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="pb-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="eyebrow mb-2.5">
            Real people, real focus
          </p>
          <h2 className="section-heading">
            Loved by focused builders.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="animate-fade-up receipt-card flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <StarRow />
              <p className="text-sm leading-relaxed flex-1 italic text-black">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-black/10">
                <div className="w-9 h-9 rounded-none flex items-center justify-center text-xs font-bold text-white bg-black flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-black">
                    {t.name}
                  </p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
