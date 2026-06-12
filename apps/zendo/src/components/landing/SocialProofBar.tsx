import { Separator } from "@/components/ui/separator";

const STATS = [
  { number: "24k", suffix: "+", label: "Active users" },
  { number: "1.2m", suffix: "", label: "Tasks completed this week" },
  { number: "380k", suffix: "", label: "Pomodoro sessions today" },
  { number: "94", suffix: "min", label: "Avg. daily focus time" },
];

export function SocialProofBar() {
  return (
    <section className="border-y border-border bg-card/60">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <div className="flex">
                {i > 0 && (
                  <Separator orientation="vertical" className="hidden md:block h-auto self-stretch" />
                )}
                <div className="flex flex-col items-center justify-center gap-1 py-8 px-4 text-center w-full">
                  <p className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-none">
                    <span className="text-primary">{stat.number}</span>
                    {stat.suffix && (
                      <span className="text-xl text-muted-foreground ml-0.5">{stat.suffix}</span>
                    )}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
