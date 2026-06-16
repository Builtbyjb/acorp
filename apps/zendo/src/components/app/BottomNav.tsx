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
    <nav className="flex md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-black/10">
      {TABS.map(({ to, label, icon: Icon }) => {
        const active = isActive(to);
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-opacity ${active ? "text-black" : "text-neutral-500"}`}
            style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}

      {/* More */}
      <button
        className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium text-neutral-500 transition-opacity hover:opacity-60"
        style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
        onClick={() => setMoreSheetOpen(true)}
      >
        <MoreHorizontal className="h-5 w-5" />
        More
      </button>
    </nav>
  );
}
