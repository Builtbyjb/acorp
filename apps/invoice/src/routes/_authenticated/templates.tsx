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
        <div className="inline-flex items-center gap-2 px-4 py-2 border text-xs font-semibold border-2 border-dashed border-black/10 bg-black/5 text-neutral-500 mb-4">
          <span className="w-1.5 h-1.5 animate-pulse bg-neutral-500" />
          In development
        </div>
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2 text-neutral-500">
          Invoice Templates
        </p>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-black">
          Choose a template.
        </h2>
        <p className="text-sm leading-relaxed max-w-lg text-neutral-500">
          Professional invoice templates are on the way. Each one will be fully customizable — swap your logo, accent color, and font to match your brand.
        </p>
      </div>

      {/* Template placeholder grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templatePlaceholders.map((template, i) => (
          <div
            key={template.name}
            className="animate-fade-up border border-dashed border-black/10 p-6 transition-all duration-300 cursor-not-allowed"
            style={{ animationDelay: `${0.05 + i * 0.07}s` }}
          >
            {/* Preview placeholder */}
            <div className="mb-5 flex items-center justify-center h-[140px] bg-black/5 border border-dashed border-black/10">
              {/* Mock invoice lines */}
              <div className="w-3/4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-2 w-1/4 bg-black/10" />
                  <div className="h-2 w-1/6 bg-black/10" />
                </div>
                <div className="h-px w-full bg-black/10" />
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex justify-between">
                    <div className="h-1.5 w-2/5 bg-black/10" />
                    <div className="h-1.5 w-1/6 bg-black/10" />
                  </div>
                ))}
                <div className="h-px w-full bg-black/10" />
                <div className="flex justify-end">
                  <div className="h-2 w-1/4 bg-black/10" />
                </div>
              </div>
            </div>

            {/* Template info */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-bold text-black">
                {template.name}
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold border border-black/10 bg-black/5 text-neutral-500">
                <span className="w-1 h-1 animate-pulse bg-neutral-500" />
                Soon
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-3 text-neutral-500">
              {template.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {template.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold bg-black/5 text-neutral-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="border border-dashed border-black/10 px-6 py-5">
        <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1 text-neutral-500">
          Want to influence the roadmap?
        </p>
        <p className="text-sm text-neutral-500">
          Tell us which template style matters most to you via{" "}
          <a href="/settings/feedback" className="font-semibold text-black hover:opacity-60 transition-opacity">
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
