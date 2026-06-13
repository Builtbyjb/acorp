import type { TopStats } from "@shared/lib/types";
import { formatCurrency } from "@/lib/utils";
import { SkeletonCard } from "@/components/Skeleton";

interface StatsCardsProps {
  stats: TopStats;
  isLoading: boolean;
}

const STATS_ERROR = "—";

export default function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: stats ? formatCurrency(stats.totalRevenue) : STATS_ERROR,
      description: "From paid invoices",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 4.5v7M5.5 6.5c0-.83.9-1.5 2.5-1.5s2.5.67 2.5 1.5c0 1.5-5 1.5-5 3 0 .83.9 1.5 2.5 1.5s2.5-.67 2.5-1.5" />
        </svg>
      ),
      iconBg: "#4382df0e",
      iconColor: "#4382df",
    },
    {
      title: "Paid Invoices",
      value: stats ? stats.paidInvoices.toString() : STATS_ERROR,
      description: "Successfully collected",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1z" />
          <path d="M5 8l2 2 4-4" />
        </svg>
      ),
      iconBg: "#22c55e12",
      iconColor: "#16a34a",
    },
    {
      title: "Pending Invoices",
      value: stats ? stats.pendingInvoices : STATS_ERROR,
      description: "Awaiting payment",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 5v3.5l2 2" />
        </svg>
      ),
      iconBg: "#f59e0b12",
      iconColor: "#d97706",
    },
    {
      title: "Total Clients",
      value: stats ? stats.totalClients.toString() : STATS_ERROR,
      description: "Active clients",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="5" r="2.5" />
          <path d="M1.5 14a4.5 4.5 0 019 0" />
          <circle cx="12" cy="5.5" r="2" />
          <path d="M14.5 13a3 3 0 00-3-3" />
        </svg>
      ),
      iconBg: "#7F8CAA14",
      iconColor: "#7F8CAA",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <div key={card.title}>
          {!isLoading ? (
            <div
              className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                animationDelay: `${0.05 + i * 0.07}s`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#7F8CAA" }}>
                  {card.title}
                </p>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                >
                  {card.icon}
                </div>
              </div>
              <div
                className="text-2xl font-extrabold tracking-tight leading-none mb-1.5"
                style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
              >
                {card.value}
              </div>
              <p className="text-xs" style={{ color: "#7F8CAA" }}>
                {card.description}
              </p>
            </div>
          ) : (
            <SkeletonCard />
          )}
        </div>
      ))}
    </div>
  );
}
