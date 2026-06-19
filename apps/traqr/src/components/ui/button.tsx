import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scanner/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-scanner text-slate-ink shadow-md shadow-scanner-glow hover:bg-scanner-dark hover:shadow-lg hover:shadow-scanner-glow",
        secondary:
          "bg-safety text-white shadow-md shadow-safety-bg hover:bg-safety-dark hover:shadow-lg hover:shadow-safety-bg",
        outline:
          "border-2 border-slate-border-strong bg-slate-paper text-slate-ink hover:border-scanner/60 hover:text-scanner-dark",
        ghost:
          "bg-transparent text-slate-muted hover:text-slate-ink hover:bg-slate-border",
        dark:
          "bg-slate-ink text-slate-paper shadow-md shadow-slate-ink/15 hover:bg-slate-soot hover:shadow-lg hover:shadow-slate-ink/20",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}
