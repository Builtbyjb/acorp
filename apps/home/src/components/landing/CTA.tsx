import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@shared/ui/components/button";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section>
      <div
        className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA16 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#4382df" }}>
            Get started today
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Start with one.
            <br />
            <span style={{ color: "#7F8CAA" }}>Stay for the suite.</span>
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: "#7F8CAA" }}>
            Each product is powerful on its own — but they're designed to work together, so your tools grow as your
            needs do.
          </p>
          <Button onClick={() => navigate({ to: "/products" })}>
            Explore the suite
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
