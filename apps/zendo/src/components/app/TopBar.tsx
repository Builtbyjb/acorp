import { Link, useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

function ZendoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="13" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx="14" cy="14" r="5" fill="hsl(var(--primary))" />
      <line x1="14" y1="1" x2="14" y2="7" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="21" x2="14" y2="27" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <line x1="1" y1="14" x2="7" y2="14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="14" x2="27" y2="14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TopBar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const navigate = useNavigate();

  const initials = user?.email
    ? user.email[0].toUpperCase()
    : "?";

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <header className="h-14 flex items-center gap-3 px-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      {/* Sidebar toggle (desktop) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="hidden md:flex h-8 w-8 text-muted-foreground"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Logo (mobile) */}
      <Link to="/app/today" className="flex items-center gap-2 md:hidden">
        <ZendoMark />
        <span className="font-bold text-sm tracking-tight">Zendo</span>
      </Link>

      {/* Logo (desktop, shown when sidebar collapsed) */}
      <Link to="/app/today" className="hidden md:flex items-center gap-2">
        <ZendoMark />
        <span className="font-bold text-sm tracking-tight">Zendo</span>
      </Link>

      <div className="flex-1" />

      {/* Pomodoro mini widget */}
      <PomodoroMiniWidget />

      {/* User avatar + menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5">
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
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
