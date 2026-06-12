import { Link } from "@tanstack/react-router";
import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTaskStore } from "@/stores/taskStore";

export function ProjectsPage() {
  const projects = useTaskStore((s) => s.projects.filter((p) => !p.archived));
  const addProject = useTaskStore((s) => s.addProject);

  const handleAdd = () => {
    const name = prompt("Project name:");
    if (name?.trim()) addProject(name.trim());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {projects.length} active project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button size="sm" className="rounded-xl" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-1" /> New project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">No projects yet</p>
          <Button size="sm" variant="outline" className="rounded-xl" onClick={handleAdd}>
            Create your first project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((p) => (
            <Link key={p.id} to="/app/projects/$projectId" params={{ projectId: p.id }}>
              <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <span className="font-medium text-sm">{p.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
