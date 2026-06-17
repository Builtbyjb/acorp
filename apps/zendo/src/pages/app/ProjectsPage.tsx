import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { FolderOpen, Plus } from "lucide-react";
import { useTaskStore } from "@/stores/taskStore";

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5">
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

export function ProjectsPage() {
  const allProjects = useTaskStore((s) => s.projects);
  const projects = useMemo(() => allProjects.filter((p) => !p.archived), [allProjects]);
  const addProject = useTaskStore((s) => s.addProject);

  const handleAdd = () => {
    const name = prompt("Project name:");
    if (name?.trim()) addProject(name.trim());
  };

  return (
    <div className="h-full p-4 md:p-6 bg-zendo-cream">
      <div className="mb-6">
        <p className="data-label mb-2">Workspace</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zendo-ink">Projects</h1>
            <p className="text-sm mt-1 text-zendo-ink-light">
              {projects.length} active project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-zendo-coral rounded-full shadow-lg shadow-zendo-coral/20 hover:bg-zendo-coral/90 transition-colors"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4" /> New project
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white border border-zendo-ink/8 rounded-2xl p-16 shadow-sm flex flex-col items-center justify-center gap-4 text-center">
          <FolderOpen className="h-12 w-12 text-zendo-ink/15" />
          <p className="text-sm text-zendo-ink-light">No projects yet</p>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-zendo-ink/10 bg-white hover:bg-zendo-coral/5 hover:border-zendo-coral/20 hover:text-zendo-coral active:scale-95 transition-all rounded-full"
            onClick={handleAdd}
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {projects.map((p, i) => (
            <Link
              key={p.id}
              to="/app/projects/$projectId"
              params={{ projectId: p.id }}
              className="animate-fade-up group block no-underline"
              style={{ animationDelay: `${0.05 + i * 0.07}s` }}
            >
              <div className="bg-white border border-zendo-ink/8 p-6 rounded-2xl flex items-center gap-3 hover:shadow-md hover:shadow-zendo-ink/5 transition-all">
                <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <span className="font-semibold text-sm flex-1 truncate text-zendo-ink">
                  {p.name}
                </span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}

          {/* Add new placeholder */}
          <div
            className="border border-dashed border-zendo-ink/15 px-6 py-5 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-zendo-coral/30 hover:text-zendo-coral transition-colors"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4 text-zendo-ink-light" />
            <span className="text-sm font-medium text-zendo-ink-light">New project</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
