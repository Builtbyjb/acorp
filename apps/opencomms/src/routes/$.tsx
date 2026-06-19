import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/$")({
  component: NotFoundPage,
});

function NotFoundPage() {
  const { _splat } = Route.useParams();

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary) / 0.12) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl bg-primary/5" />
      </div>

      <div className="relative text-center animate-fade-up max-w-lg">
        <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3 text-muted-foreground">
          Error
        </p>
        <h1 className="font-extrabold tracking-tight mb-4 text-foreground" style={{
          fontSize: "clamp(5rem, 18vw, 10rem)",
          letterSpacing: "-0.05em",
          lineHeight: "0.85",
        }}>
          404
        </h1>
        <p className="text-xl font-bold tracking-tight mb-2 text-foreground">
          Page not found
        </p>
        <p className="text-sm mb-8 text-muted-foreground">
          No route matches{" "}
          <code className="rounded-lg px-2 py-0.5 text-xs font-mono bg-muted text-foreground">
            /{_splat}
          </code>
        </p>
        <Link to="/">
          <Button size="lg">
            Go home <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
