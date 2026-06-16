import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { FolderOpen, Plus } from "lucide-react";
import { useTaskStore } from "@/stores/taskStore";

function ArrowRight({ size = 14 }: { size?: number }) {
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
    <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-500 mb-2">
            Workspace
          </p>
          <h1 className="text-2xl font-bold text-black">Projects</h1>
          <p className="text-sm mt-1 text-neutral-500">
            {projects.length} active project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-black text-white hover:opacity-90 active:scale-95 transition-all"
          onClick={handleAdd}
        >
          <Plus className="h-4 w-4" /> New project <ArrowRight />
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <FolderOpen className="h-12 w-12 text-neutral-300" />
          <p className="text-sm text-neutral-500">No projects yet</p>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-black/10 hover:bg-neutral-50 active:scale-95 transition-all"
            onClick={handleAdd}
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <Link
              key={p.id}
              to="/app/projects/$projectId"
              params={{ projectId: p.id }}
              className="animate-fade-up group block no-underline"
              style={{ animationDelay: `${0.05 + i * 0.07}s` }}
            >
              <div className="bg-white border border-black/10 p-6 flex items-center gap-3 hover:bg-neutral-50 transition-colors">
                <span className="h-3 w-3 rounded-none flex-shrink-0" style={{ background: p.color }} />
                <span className="font-semibold text-sm flex-1 truncate text-black">
                  {p.name}
                </span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}

          {/* Coming-soon placeholder */}
          <div
            className="border border-dashed border-black/10 px-6 py-5 flex items-center gap-3 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4 text-neutral-500" />
            <span className="text-sm font-medium text-neutral-500">New project</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
