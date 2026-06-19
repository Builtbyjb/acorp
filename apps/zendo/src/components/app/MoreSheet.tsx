import { useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CalendarClock,
  FolderOpen,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUIStore } from "@/stores/uiStore";
import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";

export function MoreSheet() {
  const { moreSheetOpen, setMoreSheetOpen } = useUIStore();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const allProjects = useTaskStore((s) => s.projects);
  const projects = useMemo(() => allProjects.filter((p) => !p.archived), [allProjects]);
  const addProject = useTaskStore((s) => s.addProject);
  const navigate = useNavigate();

  const close = () => setMoreSheetOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate({ to: "/" });
  };

  const handleAddProject = () => {
    const name = prompt("Project name:");
    if (name?.trim()) addProject(name.trim());
  };

  const initials = user?.email ? user.email[0].toUpperCase() : "?";

  return (
    <Sheet open={moreSheetOpen} onOpenChange={setMoreSheetOpen}>
      <SheetContent
        side="bottom"
        className="bg-white border-t border-zendo-ink/10 rounded-t-3xl max-h-[80svh] flex flex-col"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <SheetHeader className="text-left pb-2">
          <SheetTitle className="text-zendo-ink">More</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          {/* User */}
          <div className="flex items-center gap-3 py-3">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-zendo-ink text-white text-sm font-bold flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-sm font-medium text-zendo-ink">My account</p>
              <p className="text-xs truncate text-zendo-ink-light">{user?.email}</p>
            </div>
          </div>

          <div className="my-2 border-t border-zendo-ink/10" />

          {/* Quick nav */}
          <nav className="flex flex-col gap-0.5 py-2">
            {[
              { to: "/app/upcoming", label: "Upcoming", icon: CalendarClock },
              { to: "/app/settings", label: "Settings", icon: Settings },
            ].map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={close}
                className="flex items-center gap-3 px-2 py-2.5 text-sm text-zendo-ink-light hover:text-zendo-ink hover:bg-zendo-coral/5 rounded-lg transition-colors"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="my-2 border-t border-zendo-ink/10" />

          {/* Projects */}
          <div className="py-2">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-2 text-zendo-ink-light">
                <FolderOpen className="h-3.5 w-3.5" /> Projects
              </span>
              <button
                onClick={handleAddProject}
                className="text-zendo-ink-light hover:text-zendo-coral transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {projects.map((p) => (
              <Link
                key={p.id}
                to="/app/projects/$projectId"
                params={{ projectId: p.id }}
                onClick={close}
                className="flex items-center gap-3 px-2 py-2.5 text-sm text-zendo-ink-light hover:text-zendo-ink hover:bg-zendo-coral/5 rounded-lg transition-colors"
              >
                <span className="h-2.5 w-2.5 rounded-sm bg-zendo-ink-light" />
                {p.name}
              </Link>
            ))}
            {projects.length === 0 && (
              <p className="text-xs px-2 py-2 text-zendo-ink-light">No projects yet</p>
            )}
          </div>

          <div className="my-2 border-t border-zendo-ink/10" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-2 py-2.5 w-full text-sm text-destructive hover:bg-destructive/10 transition-colors rounded-lg"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
