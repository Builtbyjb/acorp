import { Link, useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PomodoroMiniWidget } from "./PomodoroMiniWidget";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";

export function TopBar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const navigate = useNavigate();

  const initials = user?.email ? user.email[0].toUpperCase() : "?";

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <header
      className="h-14 flex items-center gap-3 px-4 sticky top-0 z-40 backdrop-blur-md flex-shrink-0"
      style={{ backgroundColor: "#ebf0f0e8", borderBottom: "1px solid #7F8CAA22" }}
    >
      {/* Sidebar toggle (desktop) */}
      <button
        onClick={toggleSidebar}
        className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg transition-opacity hover:opacity-60"
        style={{ color: "#7F8CAA" }}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Logo */}
      <Link to="/app/today" className="flex items-center gap-2 no-underline">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black"
          style={{ backgroundColor: "#4382df" }}
        >
          Z
        </div>
        <span className="font-bold text-sm tracking-tight" style={{ color: "#0f172a" }}>
          Zendo
        </span>
      </Link>

      <div className="flex-1" />

      {/* Pomodoro mini widget */}
      <PomodoroMiniWidget />

      {/* User avatar + menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#4382df" }}
          >
            {initials}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5">
            <p className="text-xs truncate" style={{ color: "#7F8CAA" }}>{user?.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/app/today">Today</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive"
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
