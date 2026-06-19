import { createFileRoute } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { useEffect } from "react";

const expenseCategories = [
  { label: "Software & Subscriptions", amount: "$0.00", pct: 0 },
  { label: "Office & Supplies", amount: "$0.00", pct: 0 },
  { label: "Travel & Transport", amount: "$0.00", pct: 0 },
  { label: "Marketing & Ads", amount: "$0.00", pct: 0 },
  { label: "Professional Services", amount: "$0.00", pct: 0 },
  { label: "Other", amount: "$0.00", pct: 0 },
];

const comingFeatures = [
  "Attach receipts and photos to each expense",
  "Categorize expenses for tax reporting",
  "Compare income vs. expenses on P&L view",
  "Export CSV or PDF for your accountant",
  "Connect to bank feeds (coming later)",
];

function RouteComponent() {
  const { setTitle } = useLayout();

  useEffect(() => {
    setTitle("Expenses");
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
          Expense Tracking
        </p>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-black">
          Track what you spend.
        </h2>
        <p className="text-sm leading-relaxed max-w-lg text-neutral-500">
          Log expenses by category, attach receipts, and see your real profit. Built for freelancers who need more than a spreadsheet.
        </p>
      </div>

      {/* Two-column layout: categories + features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Expense categories preview */}
        <div className="animate-fade-up border border-dashed border-black/10 p-6" style={{ animationDelay: "0.08s" }}>
          <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-5 text-neutral-500">
            Expense Categories
          </p>
          <div className="space-y-3">
            {expenseCategories.map((cat) => (
              <div key={cat.label} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium truncate text-black">
                      {cat.label}
                    </span>
                    <span className="text-xs font-semibold ml-2 flex-shrink-0 text-neutral-500 font-mono tabular-nums">
                      {cat.amount}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-black/10" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-black/10 flex justify-between">
            <span className="text-[10px] font-mono font-bold tracking-wide uppercase text-neutral-500">
              Total expenses
            </span>
            <span className="text-xs font-bold text-black font-mono tabular-nums">
              $0.00
            </span>
          </div>
        </div>

        {/* Coming features list */}
        <div className="animate-fade-up border border-dashed border-black/10 p-6" style={{ animationDelay: "0.15s" }}>
          <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-5 text-neutral-500">
            What's coming
          </p>
          <ul className="space-y-4">
            {comingFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="w-5 h-5 border border-black/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 5l2.5 2.5L8 2.5" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-neutral-500">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA strip */}
      <div className="animate-fade-up border border-dashed border-black/10 px-6 py-5" style={{ animationDelay: "0.22s" }}>
        <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1 text-neutral-500">
          Help us prioritize
        </p>
        <p className="text-sm text-neutral-500">
          Need expense tracking urgently? Let us know via{" "}
          <a href="/settings/feedback" className="font-semibold text-black hover:opacity-60 transition-opacity">
            Feedback
          </a>{" "}
          and we'll prioritize accordingly.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/expenses")({
  component: RouteComponent,
});
