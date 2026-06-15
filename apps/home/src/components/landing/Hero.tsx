import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@shared/ui/components/button";
import Headline from "@shared/ui/custom-components/Headline";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section>
      <Headline start="One suite." end="Every need." />

      <p className="animate-fade-up  max-w-2xl leading-relaxed mb-12 text-muted-foreground">
        A carefully built collection of focused tools — each one crafted to eliminate friction and let you, your team,
        and your community do their best work.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up flex flex-wrap gap-3">
        <Button variant="default" onClick={() => navigate({ to: "/products" })}>
          Explore Products
          <ArrowRight />
        </Button>
        <Button variant="outline" onClick={() => navigate({ to: "/custom" })}>
          Something Custom?
        </Button>
      </div>
    </section>
  );
}
