import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-xl border border-slate-border bg-slate-elevated px-4 py-3 text-sm text-slate-ink placeholder:text-slate-subtle transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scanner/40 focus-visible:border-scanner/60",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
