import { createFileRoute } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { useEffect } from "react";

const reportTypes = [
  {
    title: "Revenue Overview",
    description: "Monthly and annual revenue trends with year-over-year comparison.",
  },
  {
    title: "Invoice Aging",
    description: "See which invoices are overdue and by how many days. Follow up faster.",
  },
  {
    title: "Client Statements",
    description: "Per-client summary of all invoices, payments, and outstanding balance.",
  },
  {
    title: "Tax Summary",
    description: "Total tax collected across all paid invoices. Export-ready for your accountant.",
  },
  {
    title: "Payment Methods",
    description: "Breakdown of how clients are paying — bank transfer, card, cash, and more.",
  },
  {
    title: "Profit & Loss",
    description: "Income vs. expenses at a glance. Know exactly where your business stands.",
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
        <div className="inline-flex items-center gap-2 px-4 py-2 border text-xs font-semibold border-2 border-dashed border-black/10 bg-black/5 text-neutral-500 mb-4">
          <span className="w-1.5 h-1.5 animate-pulse bg-neutral-500" />
          In development
        </div>
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2 text-neutral-500">
          Analytics & Reports
        </p>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-black">
          Know your numbers.
        </h2>
        <p className="text-sm leading-relaxed max-w-lg text-neutral-500">
          Deep financial reporting is coming. Export-ready summaries, trend analysis, and tax breakdowns — everything your accountant actually needs.
        </p>
      </div>

      {/* Report type cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report, i) => (
          <div
            key={report.title}
            className="animate-fade-up border border-dashed border-black/10 p-6 transition-all duration-300 cursor-not-allowed"
            style={{ animationDelay: `${0.05 + i * 0.07}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 border border-black/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-neutral-500">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold border border-black/10 bg-black/5 text-neutral-500">
                <span className="w-1 h-1 animate-pulse bg-neutral-500" />
                Soon
              </span>
            </div>

            {/* Mock chart bar */}
            <div className="flex items-end gap-1 h-12 mb-4">
              {[40, 65, 50, 80, 60, 90, 70].map((h, j) => (
                <div
                  key={j}
                  className="flex-1"
                  style={{ height: `${h}%`, backgroundColor: j === 5 ? "#00000020" : "#00000010" }}
                />
              ))}
            </div>

            <h3 className="text-base font-bold mb-1.5 text-black">
              {report.title}
            </h3>
            <p className="text-xs leading-relaxed text-neutral-500">
              {report.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA strip */}
      <div className="border border-dashed border-black/10 px-6 py-5">
        <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1 text-neutral-500">
          Shape this feature
        </p>
        <p className="text-sm text-neutral-500">
          Tell us which reports matter most to your business via{" "}
          <a href="/settings/feedback" className="font-semibold text-black hover:opacity-60 transition-opacity">
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
