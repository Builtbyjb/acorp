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
  const projects = useTaskStore((s) => s.projects.filter((p) => !p.archived));
  const addProject = useTaskStore((s) => s.addProject);

  const handleAdd = () => {
    const name = prompt("Project name:");
    if (name?.trim()) addProject(name.trim());
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "#7F8CAA" }}>
            Workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>Projects</h1>
          <p className="text-sm mt-1" style={{ color: "#7F8CAA" }}>
            {projects.length} active project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
          style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
          onClick={handleAdd}
        >
          <Plus className="h-4 w-4" /> New project <ArrowRight />
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <FolderOpen className="h-12 w-12" style={{ color: "#7F8CAA40" }} />
          <p className="text-sm" style={{ color: "#7F8CAA" }}>No projects yet</p>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
            style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
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
              <div
                className="bg-white rounded-3xl p-7 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
              >
                <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <span className="font-semibold text-sm flex-1 truncate" style={{ color: "#0f172a" }}>
                  {p.name}
                </span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}

          {/* Coming-soon placeholder */}
          <div
            className="rounded-3xl border-2 border-dashed px-7 py-5 flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-70"
            style={{ borderColor: "#7F8CAA2a" }}
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4" style={{ color: "#7F8CAA" }} />
            <span className="text-sm font-medium" style={{ color: "#7F8CAA" }}>New project</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
