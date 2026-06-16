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
        <p className="text-sm text-neutral-500">Project not found.</p>
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
            className="w-5 h-5 rounded-none border-0 cursor-pointer bg-transparent flex-shrink-0"
          />
          <h1 className="text-2xl font-bold text-black truncate">
            {project.name}
          </h1>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-black/10 hover:bg-neutral-50 active:scale-95 transition-all flex-shrink-0 text-neutral-500"
          onClick={() => setManageStages(true)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Stages</span>
        </button>
      </div>

      <div className="border-t border-black/10" />

      {/* Unsectioned tasks */}
      {(unsectionedTasks.length > 0 || projectSections.length === 0) && (
        <div className="bg-white border border-black/10 p-6">
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
            <div className="flex items-center gap-3 border-b border-black/10 pb-2">
              <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-neutral-500">
                {section.name}
              </h2>
              <div className="flex-1" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-500">{sectionTasks.length}</span>
            </div>
            <div className="bg-white border border-black/10 p-6">
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
            className="h-8 text-sm border border-black/10 bg-transparent rounded-none"
          />
          <button
            className="px-4 py-2 text-sm font-semibold bg-black text-white hover:opacity-90 active:scale-95 transition-all"
            onClick={handleAddSection}
          >
            Add
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-neutral-500 hover:opacity-60 transition-opacity"
            onClick={() => setAddingSection(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="self-start inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:opacity-60 transition-opacity"
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
