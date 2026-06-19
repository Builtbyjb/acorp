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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl h-14 flex items-center gap-3 px-4 flex-shrink-0 shadow-sm shadow-zendo-ink/5">
      {/* Sidebar toggle (desktop) */}
      <button
        onClick={toggleSidebar}
        className="hidden md:flex h-8 w-8 items-center justify-center text-zendo-ink-light transition-colors hover:text-zendo-ink hover:bg-zendo-ink/5 rounded-lg"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Logo */}
      <Link to="/app/today" className="flex items-center gap-2 no-underline group">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-zendo-coral to-amber-400 text-white text-xs font-black shadow-sm transition-transform group-hover:scale-95">
          Z
        </div>
        <span className="font-bold text-sm tracking-tight text-zendo-ink">
          Zendo
        </span>
      </Link>

      <div className="flex-1" />

      {/* Pomodoro mini widget */}
      <PomodoroMiniWidget />

      {/* User avatar + menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 rounded-full flex items-center justify-center bg-zendo-ink text-white text-xs font-bold transition-opacity hover:opacity-80">
            {initials}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 border border-zendo-ink/10 bg-white rounded-xl">
          <div className="px-2 py-1.5">
            <p className="text-xs truncate text-zendo-ink-light">{user?.email}</p>
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
