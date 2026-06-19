import { Link } from "@tanstack/react-router";
import { TraqrMark } from "@/components/brand/logo";
import { GrainOverlay } from "@/components/brand/grain-overlay";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  badge?: ReactNode;
}

export function AuthLayout({ children, title, subtitle, badge }: AuthLayoutProps) {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-slate-base">
      <GrainOverlay />
      
      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6b696428 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Scanner glow */}
      <div
        className="absolute -top-64 -right-64 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "rgba(0, 184, 148, 0.06)" }}
      />
      {/* Warm glow */}
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "rgba(255, 107, 53, 0.05)" }}
      />

      {/* Card */}
      <div className="relative w-full max-w-md animate-fade-up" style={{ animationDelay: "0.05s" }}>
        {/* Wordmark */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="group flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-95 bg-scanner shadow-lg shadow-scanner-glow">
              <TraqrMark size={32} color="#1a1c21" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-ink">
              Traqr
            </span>
          </Link>
        </div>

        {badge && <div className="flex justify-center mb-5">{badge}</div>}

        {/* Form card */}
        <div className="bg-slate-paper rounded-2xl border border-slate-border inner-glow p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight mb-1.5 text-slate-ink" style={{ lineHeight: 1.1 }}>
              {title}
            </h1>
            <p className="text-sm text-slate-muted">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
