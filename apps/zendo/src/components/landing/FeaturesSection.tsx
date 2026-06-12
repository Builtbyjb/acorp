import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
      <rect x="7" y="14" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8" />
      <line x1="12" y1="9"  x2="12" y2="13" />
      <line x1="12" y1="13" x2="15" y2="15" />
      <line x1="9"  y1="2"  x2="15" y2="2" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: <CalendarIcon />,
    name: "Smart Calendar",
    description:
      "Drag and drop tasks directly onto your week view. Block time, move events, and watch your schedule fall into place — all with the fluency of Google Calendar.",
    pill: "Drag & drop scheduling",
    pillColor: "bg-primary/15 text-primary border-primary/30",
    iconBg: "bg-primary/15 text-primary",
  },
  {
    icon: <CheckIcon />,
    name: "Task Management",
    description:
      "Capture everything. Assign due dates, set priorities, and break work into sub-tasks. Your to-do list stays in sync with the calendar so nothing falls through the cracks.",
    pill: "Priorities + sub-tasks",
    pillColor: "bg-[hsl(var(--timer)/0.15)] text-[hsl(var(--timer))] border-[hsl(var(--timer)/0.3)]",
    iconBg: "bg-[hsl(var(--timer)/0.15)] text-[hsl(var(--timer))]",
  },
  {
    icon: <TimerIcon />,
    name: "Pomodoro Timer",
    description:
      "Built-in 25/5 focus intervals with customisable sequences. Track your streaks, review session history, and build the deep-work habit that compounds over time.",
    pill: "Focus streaks & history",
    pillColor: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    iconBg: "bg-teal-500/15 text-teal-400",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center flex flex-col gap-4 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Everything you need
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
            Three tools. One calm workflow.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Zendo brings your calendar, task list, and focus timer into a single,
            distraction-free space.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <Card
              key={f.name}
              className="bg-card border-border hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] transition-all duration-300 group"
            >
              <CardHeader className="pb-2">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${f.iconBg}`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{f.name}</h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
                <Badge
                  variant="outline"
                  className={`self-start rounded-full text-xs font-semibold ${f.pillColor}`}
                >
                  {f.pill}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
