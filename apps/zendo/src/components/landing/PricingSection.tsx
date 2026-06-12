import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      className={cn("flex-shrink-0", className)}
    >
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FREE_FEATURES = [
  "Unlimited tasks",
  "Basic week-view calendar",
  "1 Pomodoro preset",
  "Up to 3 active projects",
  "Community support",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Google & Outlook calendar sync",
  "Custom Pomodoro sequences",
  "Unlimited projects",
  "Focus analytics & streaks",
  "Priority support",
  "Early access to new features",
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center flex flex-col gap-4 max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Simple pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
            Start free. Upgrade when ready.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            No surprise fees. Cancel any time. Your data is always yours.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
          {/* Free */}
          <Card className="bg-card border-border flex flex-col">
            <CardHeader className="pb-0">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Free
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-bold tracking-tighter text-foreground">$0</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Perfect for individuals getting started.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 flex-1 pt-6">
              <Separator />
              <ul className="flex flex-col gap-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle className="text-muted-foreground mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl mt-auto"
              >
                <Link to="/signup">Get started free</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card
            className="bg-card border-primary/50 flex flex-col relative"
            style={{ boxShadow: "0 0 40px hsl(var(--primary)/0.15)" }}
          >
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="rounded-full px-4 py-1 text-xs font-bold bg-primary text-primary-foreground">
                Most popular
              </Badge>
            </div>

            <CardHeader className="pb-0 pt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                Pro
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-muted-foreground text-xl self-start mt-2">$</span>
                <span className="text-5xl font-bold tracking-tighter text-foreground">5</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">
                For serious makers who want every edge.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 flex-1 pt-6">
              <Separator />
              <ul className="flex flex-col gap-3">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle className={cn("mt-0.5", f === "Everything in Free" ? "text-muted-foreground" : "text-primary")} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full rounded-xl mt-auto shadow-[0_0_24px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_36px_hsl(var(--primary)/0.6)] transition-shadow"
              >
                <Link to="/signup">Start Pro free for 14 days</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Pro trial requires no credit card. Billed monthly after trial ends. Cancel any time.
        </p>
      </div>
    </section>
  );
}
