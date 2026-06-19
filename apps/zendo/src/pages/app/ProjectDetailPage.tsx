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
        <p className="text-sm text-zendo-ink-light">Project not found.</p>
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
    <div className="h-full p-4 md:p-6 bg-zendo-cream">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <input
            type="color"
            value={project.color}
            onChange={(e) => updateProject(projectId, { color: e.target.value })}
            className="w-6 h-6 rounded-full border-0 cursor-pointer bg-transparent flex-shrink-0"
          />
          <div>
            <h1 className="text-2xl font-bold text-zendo-ink truncate">
              {project.name}
            </h1>
            <p className="text-sm text-zendo-ink-light">
              {unsectionedTasks.length + projectSections.reduce((acc, s) => acc + tasks.filter((t) => t.sectionId === s.id && !t.parentId).length, 0)} tasks
            </p>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-zendo-ink/10 bg-white hover:bg-zendo-coral/5 hover:border-zendo-coral/20 hover:text-zendo-coral active:scale-95 transition-all flex-shrink-0 rounded-full text-zendo-ink-light"
          onClick={() => setManageStages(true)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Stages</span>
        </button>
      </div>

      {/* Unsectioned tasks */}
      {(unsectionedTasks.length > 0 || projectSections.length === 0) && (
        <div className="bg-white border border-zendo-ink/8 p-6 rounded-2xl shadow-sm mb-5">
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
          <div key={section.id} className="flex flex-col gap-3 mb-5">
            <div className="flex items-center gap-3 border-b border-zendo-ink/10 pb-2">
              <h2 className="data-label">
                {section.name}
              </h2>
              <div className="flex-1" />
              <span className="data-label">{sectionTasks.length}</span>
            </div>
            <div className="bg-white border border-zendo-ink/8 p-6 rounded-2xl shadow-sm">
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
            className="h-8 text-sm border border-zendo-ink/10 bg-white rounded-lg focus-visible:ring-zendo-coral/20"
          />
          <button
            className="px-4 py-2 text-sm font-semibold bg-zendo-coral text-white hover:bg-zendo-coral/90 active:scale-95 transition-all rounded-full"
            onClick={handleAddSection}
          >
            Add
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-zendo-ink-light hover:text-zendo-ink transition-colors"
            onClick={() => setAddingSection(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="inline-flex items-center gap-2 text-sm font-medium text-zendo-ink-light hover:text-zendo-coral transition-colors"
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
