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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUIStore } from "@/stores/uiStore";
import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";

export function MoreSheet() {
  const { moreSheetOpen, setMoreSheetOpen } = useUIStore();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const projects = useTaskStore((s) => s.projects.filter((p) => !p.archived));
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
    if (name?.trim()) {
      addProject(name.trim());
    }
  };

  const initials = user?.email ? user.email[0].toUpperCase() : "?";

  return (
    <Sheet open={moreSheetOpen} onOpenChange={setMoreSheetOpen}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl max-h-[80svh] flex flex-col"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <SheetHeader className="text-left pb-2">
          <SheetTitle>More</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          {/* User */}
          <div className="flex items-center gap-3 py-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">My account</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>

          <Separator className="my-2" />

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
                className="flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <Separator className="my-2" />

          {/* Projects */}
          <div className="py-2">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <FolderOpen className="h-3.5 w-3.5" /> Projects
              </span>
              <button
                onClick={handleAddProject}
                className="text-muted-foreground hover:text-foreground transition-colors"
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
                className="flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                {p.name}
              </Link>
            ))}
            {projects.length === 0 && (
              <p className="text-xs text-muted-foreground px-2 py-2">No projects yet</p>
            )}
          </div>

          <Separator className="my-2" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-2 py-2.5 w-full rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
