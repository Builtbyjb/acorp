import { useMemo } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  Clock,
  Inbox,
  Plus,
  Settings,
  Star,
  CalendarClock,
  LogOut,
  FolderOpen,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useTaskStore } from "@/stores/taskStore";
import { useUIStore } from "@/stores/uiStore";
import { useAuthStore } from "@/stores/authStore";

const MAIN_NAV = [
  { to: "/app/today",    label: "Today",    icon: Star },
  { to: "/app/inbox",    label: "Inbox",    icon: Inbox },
  { to: "/app/upcoming", label: "Upcoming", icon: CalendarClock },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/app/pomodoro", label: "Pomodoro", icon: Clock },
];

function BetaBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold border rounded ml-auto bg-white/8 border-white/15 text-white/60">
      <span className="w-1 h-1 rounded-full bg-white/60" />
      Beta
    </span>
  );
}

export function Sidebar() {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const pathname = routerState.location.pathname;
  const allProjects = useTaskStore((s) => s.projects);
  const projects = useMemo(() => allProjects.filter((p) => !p.archived), [allProjects]);
  const addProject = useTaskStore((s) => s.addProject);
  const { setActiveProjectId } = useUIStore();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const initials = user?.email ? user.email[0].toUpperCase() : "?";
  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  const handleAddProject = () => {
    const name = prompt("Project name:");
    if (name?.trim()) addProject(name.trim());
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-full bg-zendo-ink text-zendo-cream border-r border-white/10">
      <ScrollArea className="flex-1 py-4 rounded-none">
        {/* User profile */}
        <div className="px-3 mb-2">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" onClick={() => navigate({ to: "/app/settings" })}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-zendo-ink text-sm font-bold shrink-0 bg-gradient-to-br from-zendo-coral to-amber-400">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate font-semibold leading-tight text-white">{user?.email?.split("@")[0] || "Zendo User"}</span>
              <span className="truncate text-xs leading-tight text-white/50">{user?.email}</span>
            </div>
          </div>
          <div className="px-2 mt-1">
            <BetaBadge />
          </div>
        </div>

        <Separator className="my-2 bg-white/10" />

        {/* Main nav */}
        <nav className="px-3 mb-2">
          {MAIN_NAV.map(({ to, label, icon: Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full",
                  active ? "sidebar-nav-active" : "sidebar-nav-inactive"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-2 bg-white/10" />

        {/* Projects */}
        <div className="px-3">
          <div className="flex items-center justify-between mb-1 px-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-white/50 flex items-center gap-2">
              <FolderOpen className="h-3.5 w-3.5" /> Projects
            </span>
            <button
              onClick={handleAddProject}
              className="h-6 w-6 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10 text-white/50 hover:text-white"
              title="New project"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {projects.length === 0 && (
            <p className="text-xs px-3 py-2 text-white/50">No projects yet</p>
          )}

          {projects.map((project) => {
            const projectPath = `/app/projects/${project.id}`;
            const active = isActive(projectPath);
            return (
              <Link
                key={project.id}
                to="/app/projects/$projectId"
                params={{ projectId: project.id }}
                onClick={() => setActiveProjectId(project.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full",
                  active ? "sidebar-nav-active" : "sidebar-nav-inactive"
                )}
              >
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-sm bg-white/50" style={{ backgroundColor: project.color }} />
                <span className="truncate">{project.name}</span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          to="/app/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full",
            isActive("/app/settings") ? "sidebar-nav-active" : "sidebar-nav-inactive"
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
