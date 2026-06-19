import { createFileRoute, redirect, Outlet, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TraqrLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  QrCode,
  Scan,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/home", icon: LayoutDashboard },
  { label: "Packages", href: "/packages", icon: Package },
  { label: "QR Codes", href: "/qr-codes", icon: QrCode },
  { label: "Scans", href: "/scans", icon: Scan },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Team", href: "/team", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

function AuthenticatedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <div className="min-h-svh bg-slate-base flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-ink/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-svh w-64 bg-slate-paper border-r border-slate-border flex flex-col transition-transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-5 border-b border-slate-border">
          <Link to="/home" className="inline-flex items-center gap-2.5">
            <TraqrLogo color="#1a1c21" />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.href || currentPath.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                to={item.href as "/home"}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-scanner-bg text-scanner-dark"
                    : "text-slate-muted hover:text-slate-ink hover:bg-slate-border",
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-elevated border border-slate-border">
            <div className="w-8 h-8 rounded-lg bg-scanner flex items-center justify-center text-slate-ink font-semibold text-sm">
              MO
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-ink truncate">Marcus Okonkwo</p>
              <p className="text-xs text-slate-muted truncate">Operations Lead</p>
            </div>
            <ChevronDown size={14} className="text-slate-muted" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-slate-paper/90 backdrop-blur-md border-b border-slate-border flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-ink hover:bg-slate-border transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-elevated border border-slate-border w-64">
              <Search size={16} className="text-slate-muted" />
              <input
                type="text"
                placeholder="Search packages..."
                className="bg-transparent text-sm text-slate-ink placeholder:text-slate-subtle outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative p-2 rounded-lg text-slate-muted hover:text-slate-ink hover:bg-slate-border transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-safety" />
            </button>
            <Button asChild size="sm">
              <a href="#">+ Create QR</a>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/*
 * Routes that require a user to be authenticated
 */
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const isAuthenticated = true;
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});
