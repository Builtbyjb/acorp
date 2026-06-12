import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden border-y border-border">
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--primary)/0.22) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 30%, hsl(var(--timer)/0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Your next focus session starts now
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-foreground">
          Stop planning to be productive.{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--timer)) 100%)",
            }}
          >
            Start being it.
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
          Join thousands of focused builders using Zendo to ship more and stress less.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 shadow-[0_0_32px_hsl(var(--primary)/0.45)] hover:shadow-[0_0_48px_hsl(var(--primary)/0.65)] transition-shadow"
          >
            <Link to="/signup">Get started free</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <a href="#pricing">View pricing</a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Free plan forever · Pro trial, no card needed
        </p>
      </div>
    </section>
  );
}
