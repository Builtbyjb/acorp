import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <FadeIn>
          <span className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide uppercase mb-4",
            light ? "bg-scanner-bg text-scanner-dark" : "bg-slate-border text-slate-ink"
          )}>
            <span className="w-1.5 h-1.5 rounded-full bg-scanner" />
            {eyebrow}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={0.05}>
        <h2
          className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance",
            light ? "text-slate-paper" : "text-slate-ink",
            titleClassName
          )}
        >
          {title}
        </h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.1}>
          <p className={cn(
            "mt-4 text-lg max-w-2xl text-balance leading-relaxed",
            light ? "text-slate-subtle" : "text-slate-muted",
            align === "center" && "mx-auto"
          )}>
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
