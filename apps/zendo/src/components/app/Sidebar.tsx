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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
    <aside
      className="w-60 flex-shrink-0 flex flex-col h-full"
      style={{ backgroundColor: "#ffffff", borderRight: "1px solid #7F8CAA18" }}
    >
      <ScrollArea className="flex-1 py-4">
        {/* Main nav */}
        <nav className="px-3 mb-6">
          {MAIN_NAV.map(({ to, label, icon: Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className="relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all w-full"
                style={{
                  color: active ? "#0f172a" : "#7F8CAA",
                  backgroundColor: active ? "#7F8CAA18" : "transparent",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = "#7F8CAA0c"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Projects */}
        <div className="px-3">
          <div className="flex items-center justify-between mb-1 px-3">
            <span
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "#7F8CAA" }}
            >
              Projects
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="h-5 w-5 flex items-center justify-center rounded-full transition-opacity hover:opacity-60"
                  style={{ color: "#7F8CAA" }}
                  onClick={handleAddProject}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">New project</TooltipContent>
            </Tooltip>
          </div>

          {projects.length === 0 && (
            <p className="text-xs px-3 py-2" style={{ color: "#7F8CAA" }}>No projects yet</p>
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
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all w-full"
                style={{
                  color: active ? "#0f172a" : "#7F8CAA",
                  backgroundColor: active ? "#7F8CAA18" : "transparent",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = "#7F8CAA0c"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
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
      <div className="p-3" style={{ borderTop: "1px solid #7F8CAA18" }}>
        <Link
          to="/app/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all w-full"
          style={{
            color: isActive("/app/settings") ? "#0f172a" : "#7F8CAA",
            backgroundColor: isActive("/app/settings") ? "#7F8CAA18" : "transparent",
          }}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
