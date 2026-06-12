import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductMockup } from "./ProductMockup";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-svh pt-24 pb-16 px-6 md:px-12 text-center overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 15%, hsl(var(--primary)/0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 70% 65%, hsl(var(--timer)/0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl mx-auto">
        {/* Eyebrow badge */}
        <Badge
          variant="outline"
          className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider border-primary/40 text-primary bg-primary/10"
        >
          ✦ Calm productivity, finally
        </Badge>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.07] text-foreground">
          Your day,{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--timer)) 100%)",
            }}
          >
            designed for focus
          </span>
        </h1>

        {/* Sub-copy */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-[540px] leading-relaxed">
          Drag tasks onto a beautiful calendar, chip away at them with a built-in
          Pomodoro timer, and actually get things done.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 shadow-[0_0_32px_hsl(var(--primary)/0.45)] hover:shadow-[0_0_48px_hsl(var(--primary)/0.6)] transition-shadow"
          >
            <Link to="/signup">Get started free</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <a href="#preview">See it in action</a>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-1">
          No credit card required · Free plan always available
        </p>
      </div>

      {/* Product mockup */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16">
        <ProductMockup />
      </div>
    </section>
  );
}
