import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Plus, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TaskList } from "@/components/tasks/TaskList";
import { StageManager } from "@/components/tasks/StageManager";
import { FAB } from "@/components/app/FAB";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useTaskStore } from "@/stores/taskStore";

export function ProjectDetailPage() {
  const { projectId } = useParams({ from: "/app/projects/$projectId" });
  const { projects, sections, tasks, addSection, updateProject } = useTaskStore();

  const project = projects.find((p) => p.id === projectId);
  const projectSections = [...sections.filter((s) => s.projectId === projectId)]
    .sort((a, b) => a.order - b.order);
  const unsectionedTasks = tasks.filter(
    (t) => t.projectId === projectId && !t.sectionId && !t.parentId
  );

  const [addingSection, setAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [manageStages, setManageStages] = useState(false);
  const [addingTask, setAddingTask] = useState<{ sectionId?: string } | null>(null);

  if (!project) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm" style={{ color: "#7F8CAA" }}>Project not found.</p>
      </div>
    );
  }

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;
    addSection(projectId, newSectionName.trim());
    setNewSectionName("");
    setAddingSection(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <input
            type="color"
            value={project.color}
            onChange={(e) => updateProject(projectId, { color: e.target.value })}
            className="w-5 h-5 rounded-full border-0 cursor-pointer bg-transparent flex-shrink-0"
          />
          <h1 className="text-3xl font-bold tracking-tight truncate" style={{ color: "#0f172a" }}>
            {project.name}
          </h1>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95 flex-shrink-0"
          style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
          onClick={() => setManageStages(true)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Stages</span>
        </button>
      </div>

      <div style={{ borderTop: "1px solid #7F8CAA18" }} />

      {/* Unsectioned tasks */}
      {(unsectionedTasks.length > 0 || projectSections.length === 0) && (
        <div
          className="bg-white rounded-3xl p-7"
          style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
        >
          <TaskList
            tasks={unsectionedTasks}
            projectId={projectId}
            emptyMessage="No tasks yet"
            showAddButton
          />
        </div>
      )}

      {/* Sections */}
      {projectSections.map((section) => {
        const sectionTasks = tasks.filter(
          (t) => t.projectId === projectId && t.sectionId === section.id && !t.parentId
        );
        return (
          <div key={section.id} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h2
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: "#7F8CAA" }}
              >
                {section.name}
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: "#7F8CAA18" }} />
              <span className="text-xs" style={{ color: "#7F8CAA" }}>{sectionTasks.length}</span>
            </div>
            <div
              className="bg-white rounded-3xl p-7"
              style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
            >
              <TaskList
                tasks={sectionTasks}
                projectId={projectId}
                sectionId={section.id}
                emptyMessage="No tasks in this section"
                showAddButton
              />
            </div>
          </div>
        );
      })}

      {/* Add section */}
      {addingSection ? (
        <div className="flex gap-2 items-center">
          <Input
            autoFocus
            placeholder="Section name…"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSection();
              if (e.key === "Escape") setAddingSection(false);
            }}
            className="h-8 text-sm"
          />
          <button
            className="px-4 py-2 text-sm font-semibold text-white rounded-full transition-all hover:opacity-92 active:scale-95"
            style={{ backgroundColor: "#4382df" }}
            onClick={handleAddSection}
          >
            Add
          </button>
          <button
            className="px-4 py-2 text-sm font-medium rounded-full transition-opacity hover:opacity-60"
            style={{ color: "#7F8CAA" }}
            onClick={() => setAddingSection(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="self-start inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
          style={{ color: "#7F8CAA" }}
          onClick={() => setAddingSection(true)}
        >
          <Plus className="h-3.5 w-3.5" /> Add section
        </button>
      )}

      <FAB onClick={() => setAddingTask({})} label="Add task" />

      <StageManager open={manageStages} onClose={() => setManageStages(false)} />

      <ResponsiveModal
        open={!!addingTask}
        onOpenChange={(v) => !v && setAddingTask(null)}
        title="New task"
      >
        <TaskForm
          projectId={projectId}
          sectionId={addingTask?.sectionId}
          onSuccess={() => setAddingTask(null)}
          onCancel={() => setAddingTask(null)}
        />
      </ResponsiveModal>
    </div>
  );
}

export default ProjectDetailPage;
