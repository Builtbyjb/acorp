import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  Clock,
  Inbox,
  Plus,
  Settings,
  Star,
  CalendarClock,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/stores/taskStore";
import { useUIStore } from "@/stores/uiStore";

const MAIN_NAV = [
  { to: "/app/today",    label: "Today",    icon: Star },
  { to: "/app/inbox",    label: "Inbox",    icon: Inbox },
  { to: "/app/upcoming", label: "Upcoming", icon: CalendarClock },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/app/pomodoro", label: "Pomodoro", icon: Clock },
];

export function Sidebar() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const projects = useTaskStore((s) => s.projects.filter((p) => !p.archived));
  const addProject = useTaskStore((s) => s.addProject);
  const { setActiveProjectId } = useUIStore();

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  const handleAddProject = () => {
    const name = prompt("Project name:");
    if (name?.trim()) addProject(name.trim());
  };

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col border-r border-border bg-background h-full">
      <ScrollArea className="flex-1 py-4">
        {/* Main nav */}
        <nav className="px-3 mb-6">
          {MAIN_NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full",
                isActive(to)
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Projects */}
        <div className="px-3">
          <div className="flex items-center justify-between mb-1 px-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Projects
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-muted-foreground hover:text-foreground"
                  onClick={handleAddProject}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">New project</TooltipContent>
            </Tooltip>
          </div>

          {projects.length === 0 && (
            <p className="text-xs text-muted-foreground px-3 py-2">No projects yet</p>
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
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ background: project.color }}
                />
                <span className="truncate">{project.name}</span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Settings at bottom */}
      <div className="p-3 border-t border-border">
        <Link
          to="/app/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full",
            isActive("/app/settings")
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
