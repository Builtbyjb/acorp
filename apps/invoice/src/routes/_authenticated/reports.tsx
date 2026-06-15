import { createFileRoute } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { useEffect } from "react";

const reportTypes = [
  {
    title: "Revenue Overview",
    description: "Monthly and annual revenue trends with year-over-year comparison.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 16l4-5 4 3 4-7 4 2" />
        <path d="M2 2v14h16" />
      </svg>
    ),
  },
  {
    title: "Invoice Aging",
    description: "See which invoices are overdue and by how many days. Follow up faster.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 6v4.5l3 3" />
      </svg>
    ),
  },
  {
    title: "Client Statements",
    description: "Per-client summary of all invoices, payments, and outstanding balance.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
        <path d="M7 7h6M7 10h6M7 13h4" />
      </svg>
    ),
  },
  {
    title: "Tax Summary",
    description: "Total tax collected across all paid invoices. Export-ready for your accountant.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3h10a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" />
        <path d="M7 8l6 0M7 12l3 0" />
        <path d="M13 12l1-2-1-2" />
      </svg>
    ),
  },
  {
    title: "Payment Methods",
    description: "Breakdown of how clients are paying — bank transfer, card, cash, and more.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="16" height="11" rx="2" />
        <path d="M2 9h16" />
        <path d="M6 13h2M10 13h2" />
      </svg>
    ),
  },
  {
    title: "Profit & Loss",
    description: "Income vs. expenses at a glance. Know exactly where your business stands.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v16M4 6l6-4 6 4M4 14l6 4 6-4" />
      </svg>
    ),
  },
];

function RouteComponent() {
  const { setTitle } = useLayout();

  useEffect(() => {
    setTitle("Reports");
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
          Analytics & Reports
        </p>
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
        >
          Know your numbers.
        </h2>
        <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#7F8CAA" }}>
          Deep financial reporting is coming. Export-ready summaries, trend analysis, and tax breakdowns — everything your accountant actually needs.
        </p>
      </div>

      {/* Report type cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report, i) => (
          <div
            key={report.title}
            className="animate-fade-up rounded-3xl border-2 border-dashed p-7 transition-all duration-300 cursor-not-allowed"
            style={{
              borderColor: "#7F8CAA2a",
              animationDelay: `${0.05 + i * 0.07}s`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#7F8CAA14", color: "#7F8CAA" }}
              >
                {report.icon}
              </div>
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

            {/* Mock chart bar */}
            <div className="flex items-end gap-1 h-12 mb-4">
              {[40, 65, 50, 80, 60, 90, 70].map((h, j) => (
                <div
                  key={j}
                  className="flex-1 rounded-t"
                  style={{ height: `${h}%`, backgroundColor: j === 5 ? "#4382df20" : "#7F8CAA14" }}
                />
              ))}
            </div>

            <h3 className="text-base font-bold mb-1.5" style={{ color: "#0f172a" }}>
              {report.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#7F8CAA" }}>
              {report.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA strip */}
      <div
        className="rounded-3xl border-2 border-dashed px-7 py-6"
        style={{ borderColor: "#7F8CAA2a" }}
      >
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: "#7F8CAA" }}>
          Shape this feature
        </p>
        <p className="text-sm" style={{ color: "#7F8CAA" }}>
          Tell us which reports matter most to your business via{" "}
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

export const Route = createFileRoute("/_authenticated/reports")({
  component: RouteComponent,
});
