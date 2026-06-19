import { cn } from "@/lib/utils";

interface ScanLineProps {
  className?: string;
  color?: string;
  animated?: boolean;
}

export function ScanLine({
  className,
  color = "#00b894",
  animated = true,
}: ScanLineProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute left-0 right-0 h-px shadow-[0_0_12px_2px_rgba(0,184,148,0.45)]",
          animated && "animate-scan-line"
        )}
        style={{
          backgroundColor: color,
          boxShadow: `0 0 12px 2px ${color}73, 0 0 24px 4px ${color}33`,
        }}
      />
    </div>
  );
}
