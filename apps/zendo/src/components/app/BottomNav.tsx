import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Clock, Inbox, MoreHorizontal, Star } from "lucide-react";
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
      className="flex md:hidden fixed bottom-0 inset-x-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "#ebf0f0e8",
        borderTop: "1px solid #7F8CAA22",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {TABS.map(({ to, label, icon: Icon }) => {
        const active = isActive(to);
        return (
          <Link
            key={to}
            to={to}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-opacity"
            style={{ color: active ? "#4382df" : "#7F8CAA" }}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}

      {/* More */}
      <button
        className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-opacity hover:opacity-60"
        style={{ color: "#7F8CAA" }}
        onClick={() => setMoreSheetOpen(true)}
      >
        <MoreHorizontal className="h-5 w-5" />
        More
      </button>
    </nav>
  );
}
