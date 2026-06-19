import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section>
      <p className="animate-fade-up text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground animate-[0.05s]">
        ACorp Suite
      </p>

      <h1 className="animate-fade-up font-bold leading-[0.87] tracking-[-0.04em] mb-7 text-6xl">
        One suite. <span className="text-outline text-6xl">Every need.</span>
      </h1>

      <p className="animate-fade-up max-w-2xl leading-relaxed mb-12 animate-[0.22s] text-muted-foreground">
        A carefully built collection of focused tools — each one crafted to eliminate friction and let you, your team,
        and your community do their best work.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up flex flex-wrap gap-3 animate-[0.32s]">
        <Button variant="default" onClick={() => navigate({ to: "/products" })}>
          Explore Products
        </Button>
        <Button variant="outline" onClick={() => navigate({ to: "/custom" })}>
          Need Something Custom?
        </Button>
      </div>
    </section>
  );
}
