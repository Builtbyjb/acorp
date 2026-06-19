import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScanLine } from "@/components/brand/scan-line";
import {
  Package,
  Scan,
  Clock,
  AlertTriangle,
  QrCode,
  Printer,
  Upload,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// ─── Mock data ──────────────────────────────────────────────────────────────

const stats = [
  {
    label: "Active packages",
    value: "1,247",
    change: "+12%",
    trend: "up" as const,
    icon: Package,
  },
  {
    label: "Scans today",
    value: "3,842",
    change: "+8%",
    trend: "up" as const,
    icon: Scan,
  },
  {
    label: "On-time rate",
    value: "94.2%",
    change: "+1.4%",
    trend: "up" as const,
    icon: Clock,
  },
  {
    label: "Exceptions",
    value: "7",
    change: "-3",
    trend: "down" as const,
    icon: AlertTriangle,
  },
];

const recentPackages = [
  {
    id: "PKG-4821",
    name: "Industrial Valves (Qty 24)",
    location: "New York Hub",
    status: "En Route" as const,
    lastScan: "2 min ago",
    carrier: "FastFreight",
  },
  {
    id: "PKG-4820",
    name: "HVAC Control Units",
    location: "Chicago Depot",
    status: "Delivered" as const,
    lastScan: "18 min ago",
    carrier: "Atlas Logistics",
  },
  {
    id: "PKG-4819",
    name: "Safety Harness Kits",
    location: "Miami Port",
    status: "Processing" as const,
    lastScan: "42 min ago",
    carrier: "PortCity",
  },
  {
    id: "PKG-4818",
    name: "Compressor Parts",
    location: "Los Angeles",
    status: "En Route" as const,
    lastScan: "1 hr ago",
    carrier: "RouteOne",
  },
  {
    id: "PKG-4817",
    name: "Electrical Conduit",
    location: "Seattle Hub",
    status: "Exception" as const,
    lastScan: "2 hr ago",
    carrier: "FastFreight",
  },
  {
    id: "PKG-4816",
    name: "Pallet Jacks (2)",
    location: "Dallas Depot",
    status: "Delivered" as const,
    lastScan: "3 hr ago",
    carrier: "FieldCore",
  },
];

const recentScans = [
  {
    id: "SCN-98231",
    packageId: "PKG-4821",
    location: "New York Hub",
    user: "D. Reyes",
    time: "2 min ago",
    type: "Outbound",
  },
  {
    id: "SCN-98230",
    packageId: "PKG-4820",
    location: "Chicago Depot",
    user: "M. Chen",
    time: "18 min ago",
    type: "Delivery",
  },
  {
    id: "SCN-98229",
    packageId: "PKG-4819",
    location: "Miami Port",
    user: "A. Patel",
    time: "42 min ago",
    type: "Receiving",
  },
  {
    id: "SCN-98228",
    packageId: "PKG-4818",
    location: "Los Angeles",
    user: "J. Kim",
    time: "1 hr ago",
    type: "Transfer",
  },
  {
    id: "SCN-98227",
    packageId: "PKG-4817",
    location: "Seattle Hub",
    user: "R. Torres",
    time: "2 hr ago",
    type: "Exception",
  },
];

const hourlyScans = [
  { hour: "6am", count: 120 },
  { hour: "8am", count: 340 },
  { hour: "10am", count: 520 },
  { hour: "12pm", count: 480 },
  { hour: "2pm", count: 610 },
  { hour: "4pm", count: 720 },
  { hour: "6pm", count: 540 },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function statusVariant(status: string) {
  switch (status) {
    case "Delivered":
      return "delivered" as const;
    case "En Route":
      return "transit" as const;
    case "Processing":
      return "processing" as const;
    case "Exception":
      return "exception" as const;
    default:
      return "default" as const;
  }
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={statusVariant(status)} dot>
      {status}
    </Badge>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/_authenticated/home")({
  component: DashboardHome,
});

function DashboardHome() {
  const maxScans = Math.max(...hourlyScans.map((d) => d.count));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-ink">Dashboard</h1>
          <p className="text-sm text-slate-muted">Welcome back, Marcus. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="#">View all packages</a>
          </Button>
          <Button asChild size="sm">
            <a href="#">+ Create QR</a>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} hover={false}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-scanner-bg flex items-center justify-center">
                    <Icon size={20} className="text-scanner-dark" />
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-xs font-semibold",
                      stat.trend === "up" ? "text-scanner-dark" : "text-safety-dark",
                    )}
                  >
                    {stat.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-ink font-mono">{stat.value}</p>
                <p className="text-xs text-slate-muted mt-0.5">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="group cursor-pointer">
          <div className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-scanner-bg flex items-center justify-center">
              <QrCode size={20} className="text-scanner-dark" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-ink">Generate QR codes</p>
              <p className="text-xs text-slate-muted">Create one or many in seconds</p>
            </div>
            <ArrowRight size={18} className="text-slate-muted group-hover:text-scanner-dark transition-colors" />
          </div>
        </Card>
        <Card className="group cursor-pointer">
          <div className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-scanner-bg flex items-center justify-center">
              <Printer size={20} className="text-scanner-dark" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-ink">Print labels</p>
              <p className="text-xs text-slate-muted">PDF sheets ready for any printer</p>
            </div>
            <ArrowRight size={18} className="text-slate-muted group-hover:text-scanner-dark transition-colors" />
          </div>
        </Card>
        <Card className="group cursor-pointer">
          <div className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-scanner-bg flex items-center justify-center">
              <Upload size={20} className="text-scanner-dark" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-ink">Bulk import</p>
              <p className="text-xs text-slate-muted">Upload a CSV of package data</p>
            </div>
            <ArrowRight size={18} className="text-slate-muted group-hover:text-scanner-dark transition-colors" />
          </div>
        </Card>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Packages table */}
        <Card hover={false} className="xl:col-span-2">
          <div className="p-5 border-b border-slate-border flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-ink">Recent packages</h2>
            <a href="#" className="text-sm font-medium text-scanner-dark hover:opacity-70 transition-opacity">
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-border/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-muted">
                    Package
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-muted">
                    Location
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-muted">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-muted">
                    Last scan
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPackages.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="border-b border-slate-border/50 last:border-b-0 hover:bg-slate-elevated/50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-scanner-bg flex items-center justify-center flex-shrink-0">
                          <QrCode size={14} className="text-scanner-dark" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-ink">{pkg.name}</p>
                          <p className="text-xs text-slate-muted font-mono">{pkg.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-slate-ink">{pkg.location}</p>
                      <p className="text-xs text-slate-muted">{pkg.carrier}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={pkg.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-muted">{pkg.lastScan}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right column */}
        <div className="space-y-6">
          {/* Activity chart */}
          <Card hover={false} className="relative overflow-hidden">
            <ScanLine className="rounded-2xl opacity-40" />
            <div className="p-5 border-b border-slate-border">
              <h2 className="text-base font-bold text-slate-ink">Scan activity</h2>
              <p className="text-xs text-slate-muted">Today's hourly scan volume</p>
            </div>
            <div className="p-5">
              <div className="flex items-end gap-3 h-40">
                {hourlyScans.map((d) => (
                  <div key={d.hour} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-scanner-bg rounded-t-md relative overflow-hidden"
                      style={{ height: `${(d.count / maxScans) * 100}%` }}
                    >
                      <div className="absolute inset-x-0 bottom-0 bg-scanner/60" style={{ height: "100%" }} />
                    </div>
                    <span className="text-xs text-slate-muted">{d.hour}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent scans */}
          <Card hover={false}>
            <div className="p-5 border-b border-slate-border">
              <h2 className="text-base font-bold text-slate-ink">Recent scans</h2>
            </div>
            <div className="p-3 space-y-1">
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-elevated/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-border flex items-center justify-center flex-shrink-0">
                    <Scan size={14} className="text-slate-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-ink truncate">
                      {scan.type} — <span className="font-mono">{scan.packageId}</span>
                    </p>
                    <p className="text-xs text-slate-muted truncate">
                      {scan.location} • {scan.user}
                    </p>
                  </div>
                  <span className="text-xs text-slate-muted whitespace-nowrap">{scan.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
