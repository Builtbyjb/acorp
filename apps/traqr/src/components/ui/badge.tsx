import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "scanner" | "safety" | "outline" | "delivered" | "transit" | "processing" | "exception";
  dot?: boolean;
}

export function Badge({
  children,
  className,
  variant = "default",
  dot = false,
}: BadgeProps) {
  const variants = {
    default: "bg-slate-border text-slate-ink",
    scanner: "bg-scanner-bg text-scanner-dark",
    safety: "bg-safety-bg text-safety-dark",
    outline: "bg-transparent border border-slate-border-strong text-slate-muted",
    delivered: "bg-scanner-bg text-scanner-dark",
    transit: "bg-amber-100 text-amber-700",
    processing: "bg-blue-100 text-blue-700",
    exception: "bg-red-100 text-red-700",
  };

  const dotColors = {
    default: "bg-slate-muted",
    scanner: "bg-scanner",
    safety: "bg-safety",
    outline: "bg-slate-muted",
    delivered: "bg-scanner",
    transit: "bg-amber-500",
    processing: "bg-blue-500",
    exception: "bg-red-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />}
      {children}
    </span>
  );
}
