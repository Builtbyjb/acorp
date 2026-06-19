import { Link } from "@tanstack/react-router";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-7 w-7 text-sm",
    md: "h-8 w-8 text-base",
    lg: "h-10 w-10 text-lg",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25 group-hover:-translate-y-0.5`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[55%] w-[55%]"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </div>
      {showText && (
        <span
          className={`${textSizes[size]} font-bold tracking-tight text-foreground`}
        >
          OpenComms
        </span>
      )}
    </Link>
  );
}
