function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <rect x="7" y="14" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="13" x2="15" y2="15" />
      <line x1="9" y1="2" x2="15" y2="2" />
    </svg>
  );
}

function ArrowRight({ size = 14 }: { size?: number }) {
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
    icon: <CalendarIcon />,
    name: "Smart Calendar",
    description:
      "Drag and drop tasks directly onto your week view. Block time, move events, and watch your schedule fall into place with the fluency of Google Calendar.",
    pill: "Drag & drop scheduling",
  },
  {
    icon: <CheckIcon />,
    name: "Task Management",
    description:
      "Capture everything. Assign due dates, set priorities, and break work into sub-tasks. Your to-do list stays in sync with the calendar so nothing falls through the cracks.",
    pill: "Priorities + sub-tasks",
  },
  {
    icon: <TimerIcon />,
    name: "Pomodoro Timer",
    description:
      "Built-in 25/5 focus intervals with customisable sequences. Track your streaks, review session history, and build the deep-work habit that compounds over time.",
    pill: "Focus streaks & history",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            Everything you need
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Three tools. One calm workflow.
          </h2>
          <p
            className="text-lg max-w-xl leading-relaxed mt-3"
            style={{ color: "#7F8CAA" }}
          >
            Zendo brings your calendar, task list, and focus timer into a single,
            distraction-free space.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.name}
              className="animate-fade-up bg-white rounded-3xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{
                boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                animationDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#4382df0e", color: "#4382df" }}
              >
                {f.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
                  {f.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                  {f.description}
                </p>
              </div>

              {/* Pill */}
              <span
                className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold"
                style={{
                  backgroundColor: "#4382df0e",
                  borderColor: "#4382df2e",
                  color: "#4382df",
                }}
              >
                {f.pill}
              </span>

              {/* Learn more link */}
              <button className="group inline-flex items-center gap-1.5 text-xs font-semibold self-start transition-all hover:gap-2"
                style={{ color: "#4382df" }}>
                Learn more <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
