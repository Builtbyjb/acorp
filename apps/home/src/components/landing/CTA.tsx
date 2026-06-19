import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="relative border border-black overflow-hidden px-10 py-16 text-center bg-black">
        <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
        <div className="relative">
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-4 text-muted-foreground">
            Get started today
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Start with one.
            <br />
            <span className=" text-white text-4xl">Stay for the suite.</span>
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto leading-relaxed text-muted-foreground">
            Each product is powerful on its own — but they're designed to work together, so your tools grow as your
            needs do.
          </p>
          <Button variant="outline" className="hover:border-white" onClick={() => navigate({ to: "/products" })}>
            Explore the suite
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
