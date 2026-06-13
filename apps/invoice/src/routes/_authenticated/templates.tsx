import { createFileRoute } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { useEffect } from "react";

const templatePlaceholders = [
  {
    name: "Classic",
    description: "Clean, minimal layout. Ideal for professional services and consulting.",
    tags: ["Minimal", "Professional"],
  },
  {
    name: "Modern",
    description: "Bold typography with a structured two-column layout. Great for agencies.",
    tags: ["Bold", "Agency"],
  },
  {
    name: "Compact",
    description: "Dense, information-first layout for clients who prefer detail over decoration.",
    tags: ["Detailed", "Dense"],
  },
  {
    name: "Branded",
    description: "Full-bleed color header with your logo and accent color. Maximum brand presence.",
    tags: ["Branded", "Color"],
  },
  {
    name: "Simple",
    description: "One-page layout with no frills. Perfect for quick, recurring jobs.",
    tags: ["Quick", "Simple"],
  },
  {
    name: "Statement",
    description: "Large totals and bold summary blocks. Makes the amount impossible to miss.",
    tags: ["Statement", "Impact"],
  },
];

function RouteComponent() {
  const { setTitle } = useLayout();

  useEffect(() => {
    setTitle("Templates");
  }, [setTitle]);

  return (
    <div className="flex flex-col space-y-8 mb-32">
      {/* Section header */}
      <div>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold border-2 border-dashed mb-4"
          style={{
            borderColor: "#7F8CAA2a",
            backgroundColor: "#7F8CAA10",
            color: "#7F8CAA",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#7F8CAA" }} />
          In development
        </div>
        <p
          className="text-xs font-bold tracking-[0.25em] uppercase mb-2"
          style={{ color: "#7F8CAA" }}
        >
          Invoice Templates
        </p>
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
        >
          Choose a template.
        </h2>
        <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#7F8CAA" }}>
          Professional invoice templates are on the way. Each one will be fully customizable — swap your logo, accent color, and font to match your brand.
        </p>
      </div>

      {/* Template placeholder grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templatePlaceholders.map((template, i) => (
          <div
            key={template.name}
            className="animate-fade-up rounded-3xl border-2 border-dashed p-7 transition-all duration-300 cursor-not-allowed"
            style={{
              borderColor: "#7F8CAA2a",
              animationDelay: `${0.05 + i * 0.07}s`,
            }}
          >
            {/* Preview placeholder */}
            <div
              className="rounded-2xl mb-5 flex items-center justify-center"
              style={{
                height: "140px",
                backgroundColor: "#7F8CAA08",
                border: "1px dashed #7F8CAA20",
              }}
            >
              {/* Mock invoice lines */}
              <div className="w-3/4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-2 rounded-full w-1/4" style={{ backgroundColor: "#7F8CAA20" }} />
                  <div className="h-2 rounded-full w-1/6" style={{ backgroundColor: "#4382df20" }} />
                </div>
                <div className="h-px w-full" style={{ backgroundColor: "#7F8CAA14" }} />
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex justify-between">
                    <div className="h-1.5 rounded-full w-2/5" style={{ backgroundColor: "#7F8CAA14" }} />
                    <div className="h-1.5 rounded-full w-1/6" style={{ backgroundColor: "#7F8CAA14" }} />
                  </div>
                ))}
                <div className="h-px w-full" style={{ backgroundColor: "#7F8CAA14" }} />
                <div className="flex justify-end">
                  <div className="h-2 rounded-full w-1/4" style={{ backgroundColor: "#4382df14" }} />
                </div>
              </div>
            </div>

            {/* Template info */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-bold" style={{ color: "#0f172a" }}>
                {template.name}
              </h3>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                style={{
                  backgroundColor: "#7F8CAA10",
                  borderColor: "#7F8CAA28",
                  color: "#7F8CAA",
                }}
              >
                <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: "#7F8CAA" }} />
                Soon
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#7F8CAA" }}>
              {template.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ backgroundColor: "#7F8CAA14", color: "#7F8CAA" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div
        className="rounded-3xl border-2 border-dashed px-7 py-6"
        style={{ borderColor: "#7F8CAA2a" }}
      >
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: "#7F8CAA" }}>
          Want to influence the roadmap?
        </p>
        <p className="text-sm" style={{ color: "#7F8CAA" }}>
          Tell us which template style matters most to you via{" "}
          <a
            href="/settings/feedback"
            className="font-semibold transition-opacity hover:opacity-60"
            style={{ color: "#4382df" }}
          >
            Feedback
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/templates")({
  component: RouteComponent,
});
