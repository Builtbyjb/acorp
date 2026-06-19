import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true, style, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-slate-paper rounded-2xl border border-slate-border inner-glow overflow-hidden",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-border-strong",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-6 sm:p-8", className)}>{children}</div>;
}
