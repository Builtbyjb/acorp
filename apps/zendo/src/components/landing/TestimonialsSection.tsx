import {
  Card,
  CardContent,
} from "@/components/ui/card";

const TESTIMONIALS = [
  {
    quote:
      "I've tried every productivity app out there. Zendo is the first one that actually stuck. Having the calendar and Pomodoro timer in the same place changed everything for me.",
    name: "Amara Osei",
    role: "Product Designer · Freelance",
    initials: "AO",
    avatarBg: "bg-violet-500",
  },
  {
    quote:
      "Our whole engineering team switched to Zendo for sprint planning. Dragging tasks onto the calendar during standup is so much faster than updating a board.",
    name: "Tom Hernandez",
    role: "Engineering Lead · Loom",
    initials: "TH",
    avatarBg: "bg-amber-500",
  },
  {
    quote:
      "The focus sessions feature keeps me honest. I used to kid myself I was working — now I have hard data on where my hours actually go.",
    name: "Priya Ramesh",
    role: "Senior Writer · Substack",
    initials: "PR",
    avatarBg: "bg-teal-500",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="hsl(var(--timer))">
          <path d="M7 1l1.5 4h4.3l-3.5 2.5 1.3 4L7 9 3.4 11.5l1.3-4L1.2 5H5.5z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-card/40">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center flex flex-col gap-4 max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Real people, real focus
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
            Loved by focused builders
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.name}
              className="bg-card border-border flex flex-col"
            >
              <CardContent className="pt-6 flex flex-col gap-5 flex-1">
                <StarRow />
                <p className="text-sm text-foreground leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${t.avatarBg}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
