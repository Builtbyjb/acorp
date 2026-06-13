const liveFeatures = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7z" />
        <path d="M13 2v5h5" />
        <path d="M7 13h6M7 9h3" />
      </svg>
    ),
    title: "Lightning-fast invoicing",
    description:
      "Create professional invoices in under 60 seconds. Add line items, set due dates, and download PDF — all in one flow.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l3 3" />
      </svg>
    ),
    title: "Automatic reminders",
    description:
      "Set it and forget it. Automatic payment reminders reduce late payments without awkward follow-up emails.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10h16M10 2l8 8-8 8" />
      </svg>
    ),
    title: "Multi-currency support",
    description:
      "Bill clients in NGN, USD, CAD, and more. Currency symbols render correctly on every PDF you generate.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="16" height="12" rx="2" />
        <path d="M2 8h16" />
        <path d="M6 12h2M10 12h4" />
      </svg>
    ),
    title: "Client management",
    description:
      "Keep all your clients and their invoice history in one place. View balances, payment status, and activity at a glance.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h14v14H3z" />
        <path d="M3 7h14M7 3v14" />
      </svg>
    ),
    title: "Insights & dashboard",
    description:
      "Track total revenue, paid and pending invoices, and monthly trends — all from a single, clean dashboard.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2a6 6 0 100 12A6 6 0 0010 2z" />
        <path d="M10 8v4M10 8l2-2M10 8l-2-2" />
        <path d="M4 18a8 8 0 0112 0" />
      </svg>
    ),
    title: "Referral program",
    description:
      "Earn rewards for every business you refer. Your referral link is ready in the Settings dashboard.",
  },
];

const comingSoonFeatures = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="7" height="9" rx="1" />
        <rect x="11" y="2" width="7" height="5" rx="1" />
        <rect x="11" y="9" width="7" height="9" rx="1" />
        <rect x="2" y="13" width="7" height="5" rx="1" />
      </svg>
    ),
    title: "Invoice templates",
    description:
      "Choose from a library of professionally designed templates. Match your brand with custom colors, fonts, and layouts.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" />
        <path d="M3 9l4-3 4 4 2-2 4 3" />
      </svg>
    ),
    title: "Recurring invoices",
    description:
      "Set up auto-repeating invoices for retainer clients. Weekly, monthly, or custom intervals — fully automated.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 5h16M2 10h10M2 15h7" />
        <circle cx="16" cy="14" r="3" />
        <path d="M16 12.5v1.5l1 1" />
      </svg>
    ),
    title: "Expense tracking",
    description:
      "Log business expenses, attach receipts, and generate profit & loss summaries. Know your numbers at any time.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h14v14H3z" />
        <circle cx="10" cy="10" r="3" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2" />
      </svg>
    ),
    title: "Client portal",
    description:
      "Give clients a dedicated portal to view, download, and pay their invoices online without logging into your account.",
  },
];

export default function Features() {
  return (
    <section id="features" className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="animate-fade-up text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA", animationDelay: "0.05s" }}
          >
            Features
          </p>
          <h2
            className="animate-fade-up text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a", animationDelay: "0.12s" }}
          >
            Everything to invoice like a pro.
          </h2>
          <p
            className="animate-fade-up text-lg max-w-xl leading-relaxed mt-3"
            style={{ color: "#7F8CAA", animationDelay: "0.18s" }}
          >
            Powerful, focused tools that help you create, send, and track invoices without the bloat.
          </p>
        </div>

        {/* Live feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {liveFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                animationDelay: `${0.1 + i * 0.07}s`,
              }}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-2xl mb-4"
                style={{ backgroundColor: "#4382df0e", color: "#4382df" }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Coming-soon section */}
        <div className="mt-8 mb-6">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-1"
            style={{ color: "#7F8CAA" }}
          >
            Coming soon
          </p>
          <p className="text-sm" style={{ color: "#7F8CAA" }}>
            Roadmap features in active development.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {comingSoonFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className="animate-fade-up rounded-3xl border-2 border-dashed px-7 py-6 transition-all duration-300"
              style={{
                borderColor: "#7F8CAA2a",
                animationDelay: `${0.52 + i * 0.07}s`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-2xl"
                  style={{ backgroundColor: "#7F8CAA14", color: "#7F8CAA" }}
                >
                  {feature.icon}
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                  style={{
                    backgroundColor: "#7F8CAA10",
                    borderColor: "#7F8CAA28",
                    color: "#7F8CAA",
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full animate-pulse"
                    style={{ backgroundColor: "#7F8CAA" }}
                  />
                  Soon
                </span>
              </div>
              <h3 className="text-base font-bold mb-1.5" style={{ color: "#0f172a" }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
