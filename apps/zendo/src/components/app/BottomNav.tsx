import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Clock, Inbox, MoreHorizontal, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/uiStore";

const TABS = [
  { to: "/app/today",    label: "Today",    icon: Star },
  { to: "/app/inbox",    label: "Tasks",    icon: Inbox },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/app/pomodoro", label: "Timer",    icon: Clock },
];

export function BottomNav() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const setMoreSheetOpen = useUIStore((s) => s.setMoreSheetOpen);

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  return (
    <nav
      className="flex md:hidden fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {TABS.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
            isActive(to)
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          <Icon className={cn("h-5 w-5", isActive(to) && "text-primary")} />
          {label}
        </Link>
      ))}

      {/* More */}
      <button
        className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium text-muted-foreground"
        onClick={() => setMoreSheetOpen(true)}
      >
        <MoreHorizontal className="h-5 w-5" />
        More
      </button>
    </nav>
  );
}
