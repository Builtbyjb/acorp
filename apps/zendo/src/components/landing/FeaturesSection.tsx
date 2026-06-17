import { CalendarDays, CheckCircle2, Timer } from "lucide-react";

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5">
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: CalendarDays,
    name: "Smart Calendar",
    description:
      "Drag and drop tasks directly onto your week view. Block time, move events, and watch your schedule fall into place with the fluency of Google Calendar.",
    pill: "Drag & drop scheduling",
    color: "coral" as const,
  },
  {
    icon: CheckCircle2,
    name: "Task Management",
    description:
      "Capture everything. Assign due dates, set priorities, and break work into sub-tasks. Your to-do list stays in sync with the calendar so nothing falls through the cracks.",
    pill: "Priorities + sub-tasks",
    color: "sage" as const,
  },
  {
    icon: Timer,
    name: "Pomodoro Timer",
    description:
      "Built-in 25/5 focus intervals with customisable sequences. Track your streaks, review session history, and build the deep-work habit that compounds over time.",
    pill: "Focus streaks & history",
    color: "sky" as const,
  },
];

const colorStyles = {
  coral: {
    card: "bg-gradient-to-br from-white to-zendo-coral-light/30 border-zendo-coral/15",
    icon: "bg-zendo-coral-light text-zendo-coral",
    pill: "bg-zendo-coral/10 text-zendo-coral border-zendo-coral/15",
  },
  sage: {
    card: "bg-gradient-to-br from-white to-zendo-sage-light/30 border-zendo-sage/15",
    icon: "bg-zendo-sage-light text-zendo-sage",
    pill: "bg-zendo-sage/10 text-zendo-sage border-zendo-sage/15",
  },
  sky: {
    card: "bg-gradient-to-br from-white to-zendo-sky-light/30 border-zendo-sky/15",
    icon: "bg-zendo-sky-light text-zendo-sky",
    pill: "bg-zendo-sky/10 text-zendo-sky border-zendo-sky/15",
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-zendo-cream relative overflow-hidden">
      {/* Soft background shapes */}
      <div aria-hidden="true" className="absolute top-20 right-[-5%] w-72 h-72 rounded-full bg-zendo-sage/8 blur-[100px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-20 left-[-5%] w-80 h-80 rounded-full bg-zendo-coral/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4">Everything you need</p>
          <h2 className="section-heading">
            Three tools. One calm workflow.
          </h2>
          <p className="text-lg max-w-xl leading-relaxed mt-4 text-zendo-ink-light">
            Zendo brings your calendar, task list, and focus timer into a single,
            distraction-free space.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const styles = colorStyles[f.color];
            const Icon = f.icon;

            return (
              <div
                key={f.name}
                className={cn(
                  "animate-fade-up group flex flex-col gap-5 p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zendo-ink/5",
                  styles.card
                )}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                {/* Icon */}
                <div className={cn("w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0", styles.icon)}>
                  <Icon size={26} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="text-2xl font-bold tracking-tight text-zendo-ink">
                    {f.name}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-zendo-ink-light">
                    {f.description}
                  </p>
                </div>

                {/* Pill */}
                <span className={cn("self-start inline-flex items-center gap-2 px-4 py-2 text-xs font-bold border rounded-full", styles.pill)}>
                  {f.pill}
                </span>

                {/* Learn more link */}
                <button className="group/link inline-flex items-center gap-1.5 text-sm font-bold self-start transition-all hover:gap-2 text-zendo-ink">
                  Learn more <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
