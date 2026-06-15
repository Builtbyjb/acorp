import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@shared/ui/components/button";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section>
      {/* Dark CTA block */}
      <div
        className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
        style={{ backgroundColor: "#0f172a" }}
      >
        {/* Radial glow layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative">
          {/* Eyebrow */}
          <p
            className="animate-fade-up text-xs font-bold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#4382df", animationDelay: "0.05s" }}
          >
            Get started today
          </p>

          <h2 className="animate-fade-up font-bold text-white tracking-tight mb-5 text-3xl">
            Ready to get paid faster?
            <br />
            <span className="text-2xl ">Start free, upgrade anytime.</span>
          </h2>

          {/* Subtext */}
          <p
            className="animate-fade-up text-base mb-10 max-w-lg mx-auto leading-relaxed"
            style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
          >
            No credit card required. Free forever for up to 5 invoices per month. Upgrade when your business grows.
          </p>

          {/* CTA */}
          <div className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigate({ to: "/signup" })}>
              Create your first invoice <ArrowRight />
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: "/pricing" })}>
              View pricing
            </Button>
          </div>

          {/* Supporting chips */}
          <div
            className="animate-fade-up flex flex-wrap items-center justify-center gap-3 mt-8"
            style={{ animationDelay: "0.42s" }}
          >
            {["Setup in under 2 minutes", "PDF download", "Cancel anytime"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: "#ffffff08",
                  borderColor: "#7F8CAA25",
                  color: "#7F8CAA",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
