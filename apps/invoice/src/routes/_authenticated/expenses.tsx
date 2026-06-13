import { createFileRoute } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { useEffect } from "react";

const expenseCategories = [
  { label: "Software & Subscriptions", amount: "$0.00", icon: "💻", pct: 0 },
  { label: "Office & Supplies", amount: "$0.00", icon: "📦", pct: 0 },
  { label: "Travel & Transport", amount: "$0.00", icon: "✈️", pct: 0 },
  { label: "Marketing & Ads", amount: "$0.00", icon: "📣", pct: 0 },
  { label: "Professional Services", amount: "$0.00", icon: "🤝", pct: 0 },
  { label: "Other", amount: "$0.00", icon: "📋", pct: 0 },
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
          Expense Tracking
        </p>
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
        >
          Track what you spend.
        </h2>
        <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#7F8CAA" }}>
          Log expenses by category, attach receipts, and see your real profit. Built for freelancers who need more than a spreadsheet.
        </p>
      </div>

      {/* Two-column layout: categories + features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Expense categories preview */}
        <div
          className="animate-fade-up rounded-3xl border-2 border-dashed p-7"
          style={{ borderColor: "#7F8CAA2a", animationDelay: "0.08s" }}
        >
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
            style={{ color: "#7F8CAA" }}
          >
            Expense Categories
          </p>
          <div className="space-y-3">
            {expenseCategories.map((cat) => (
              <div key={cat.label} className="flex items-center gap-3">
                <span className="text-base w-6 flex-shrink-0">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium truncate" style={{ color: "#0f172a" }}>
                      {cat.label}
                    </span>
                    <span className="text-xs font-semibold ml-2 flex-shrink-0" style={{ color: "#7F8CAA" }}>
                      {cat.amount}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full w-full"
                    style={{ backgroundColor: "#7F8CAA14" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-5 pt-4 border-t flex justify-between"
            style={{ borderColor: "#7F8CAA14" }}
          >
            <span className="text-xs font-bold tracking-wide uppercase" style={{ color: "#7F8CAA" }}>
              Total expenses
            </span>
            <span className="text-xs font-bold" style={{ color: "#0f172a" }}>
              $0.00
            </span>
          </div>
        </div>

        {/* Coming features list */}
        <div
          className="animate-fade-up rounded-3xl border-2 border-dashed p-7"
          style={{ borderColor: "#7F8CAA2a", animationDelay: "0.15s" }}
        >
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
            style={{ color: "#7F8CAA" }}
          >
            What's coming
          </p>
          <ul className="space-y-4">
            {comingFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "#7F8CAA14" }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="#7F8CAA"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 5l2.5 2.5L8 2.5" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA strip */}
      <div
        className="animate-fade-up rounded-3xl border-2 border-dashed px-7 py-6"
        style={{ borderColor: "#7F8CAA2a", animationDelay: "0.22s" }}
      >
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: "#7F8CAA" }}>
          Help us prioritize
        </p>
        <p className="text-sm" style={{ color: "#7F8CAA" }}>
          Need expense tracking urgently? Let us know via{" "}
          <a
            href="/settings/feedback"
            className="font-semibold transition-opacity hover:opacity-60"
            style={{ color: "#4382df" }}
          >
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
