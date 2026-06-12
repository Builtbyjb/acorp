import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskItem } from "./TaskItem";
import { TaskForm } from "./TaskForm";
import { TaskDetail } from "./TaskDetail";
import type { Task } from "@/stores/taskStore";

interface Props {
  tasks: Task[];
  projectId?: string;
  sectionId?: string;
  parentId?: undefined;
  emptyMessage?: string;
  showAddButton?: boolean;
}

export function TaskList({ tasks, projectId, sectionId, emptyMessage = "No tasks yet", showAddButton = true }: Props) {
  const [adding, setAdding] = useState(false);
  const [detailTask, setDetailTask] = useState<Task | null>(null);

  const rootTasks = tasks.filter((t) => !t.parentId);

  return (
    <>
      <div className="flex flex-col gap-0.5">
        {rootTasks.length === 0 && !adding && (
          <p className="text-sm text-muted-foreground text-center py-8">{emptyMessage}</p>
        )}

        {rootTasks.map((task) => (
          <TaskItem key={task.id} task={task} depth={0} onOpenDetail={setDetailTask} />
        ))}

        {/* Inline add form */}
        {adding && (
          <div className="p-3 rounded-xl border border-border bg-card mt-1">
            <TaskForm
              projectId={projectId}
              sectionId={sectionId}
              onSuccess={() => setAdding(false)}
              onCancel={() => setAdding(false)}
            />
          </div>
        )}

        {showAddButton && !adding && (
          <Button
            variant="ghost"
            size="sm"
            className="justify-start gap-2 text-muted-foreground hover:text-foreground mt-1"
            onClick={() => setAdding(true)}
          >
            <Plus className="h-4 w-4" />
            Add task
          </Button>
        )}
      </div>

      {/* Detail panel */}
      <TaskDetail
        task={detailTask}
        open={!!detailTask}
        onClose={() => setDetailTask(null)}
      />
    </>
  );
}
