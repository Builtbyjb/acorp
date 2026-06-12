import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Plus, Settings2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
        <p className="text-muted-foreground text-sm">Project not found.</p>
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
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <input
            type="color"
            value={project.color}
            onChange={(e) => updateProject(projectId, { color: e.target.value })}
            className="w-5 h-5 rounded-full border-0 cursor-pointer bg-transparent flex-shrink-0"
          />
          <h1 className="text-2xl font-bold tracking-tight truncate">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl hidden md:flex"
            onClick={() => setManageStages(true)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Stages
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setManageStages(true)}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Unsectioned tasks */}
      {(unsectionedTasks.length > 0 || projectSections.length === 0) && (
        <TaskList
          tasks={unsectionedTasks}
          projectId={projectId}
          emptyMessage="No tasks yet"
          showAddButton
        />
      )}

      {/* Sections */}
      {projectSections.map((section) => {
        const sectionTasks = tasks.filter(
          (t) => t.projectId === projectId && t.sectionId === section.id && !t.parentId
        );
        return (
          <div key={section.id} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {section.name}
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">{sectionTasks.length}</span>
            </div>
            <TaskList
              tasks={sectionTasks}
              projectId={projectId}
              sectionId={section.id}
              emptyMessage="No tasks in this section"
              showAddButton
            />
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
          <Button size="sm" onClick={handleAddSection} className="rounded-xl">Add</Button>
          <Button size="sm" variant="ghost" onClick={() => setAddingSection(false)}>Cancel</Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="self-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => setAddingSection(true)}
        >
          <Plus className="h-3.5 w-3.5" /> Add section
        </Button>
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
