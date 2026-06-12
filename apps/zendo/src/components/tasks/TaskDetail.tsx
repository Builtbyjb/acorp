import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { TagSelector } from "./TagSelector";
import { PrioritySelector } from "./PrioritySelector";
import { StageSelector } from "./StageSelector";
import { TaskForm } from "./TaskForm";
import { useTaskStore, type Task } from "@/stores/taskStore";

interface Props {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

export function TaskDetail({ task, open, onClose }: Props) {
  const { updateTask, deleteTask, getTasksByParent } = useTaskStore();
  const [editingTitle, setEditingTitle] = useState(false);
  const [addingSubtask, setAddingSubtask] = useState(false);

  if (!task) return null;

  const subtasks = getTasksByParent(task.id);
  const canAddSubtask = task.level < 2;

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto flex flex-col gap-0 p-0"
      >
        <SheetHeader className="px-5 pt-5 pb-3 flex-row items-start justify-between space-y-0">
          <SheetTitle className="text-base font-semibold pr-8 leading-snug">
            {editingTitle ? (
              <Input
                defaultValue={task.title}
                autoFocus
                className="text-base font-semibold h-auto border-0 border-b border-border rounded-none px-0 focus-visible:ring-0"
                onBlur={(e) => {
                  const val = e.target.value.trim();
                  if (val && val !== task.title) updateTask(task.id, { title: val });
                  setEditingTitle(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  if (e.key === "Escape") setEditingTitle(false);
                }}
              />
            ) : (
              <button className="text-left hover:opacity-70 transition-opacity" onClick={() => setEditingTitle(true)}>
                {task.title}
              </button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="px-5 flex flex-col gap-4 flex-1">
          <Separator />

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 items-center">
            <StageSelector
              stageId={task.stageId}
              onChange={(id) => updateTask(task.id, { stageId: id })}
            />
            <PrioritySelector
              value={task.priority}
              onChange={(p) => updateTask(task.id, { priority: p })}
            />
            <Input
              type="date"
              value={task.dueDate ?? ""}
              onChange={(e) => updateTask(task.id, { dueDate: e.target.value || undefined })}
              className="h-7 w-36 text-xs"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</p>
            <TagSelector
              selectedIds={task.tags}
              onChange={(ids) => updateTask(task.id, { tags: ids })}
            />
          </div>

          <Separator />

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</p>
            <Textarea
              placeholder="Add a description…"
              defaultValue={task.description ?? ""}
              rows={4}
              className="resize-none text-sm"
              onBlur={(e) => {
                const val = e.target.value;
                if (val !== (task.description ?? "")) {
                  updateTask(task.id, { description: val || undefined });
                }
              }}
            />
          </div>

          <Separator />

          {/* Subtasks */}
          {(subtasks.length > 0 || canAddSubtask) && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Subtasks ({subtasks.length})
              </p>

              {subtasks.map((sub) => (
                <SubtaskRow key={sub.id} task={sub} />
              ))}

              {canAddSubtask && !addingSubtask && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-2 text-muted-foreground text-xs"
                  onClick={() => setAddingSubtask(true)}
                >
                  + Add subtask
                </Button>
              )}

              {addingSubtask && (
                <div className="p-3 rounded-xl border border-border bg-muted/30">
                  <TaskForm
                    parentId={task.id}
                    parentLevel={task.level as 0 | 1}
                    onSuccess={() => setAddingSubtask(false)}
                    onCancel={() => setAddingSubtask(false)}
                  />
                </div>
              )}
            </div>
          )}

          <Separator />

          <p className="text-xs text-muted-foreground">
            Created {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border">
          <Button variant="destructive" size="sm" className="gap-2 rounded-xl" onClick={handleDelete}>
            <Trash2 className="h-3.5 w-3.5" /> Delete task
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SubtaskRow({ task }: { task: Task }) {
  const { completeTask, uncompleteTask } = useTaskStore();
  const subtasks = useTaskStore((s) => s.getTasksByParent(task.id));
  const isDone = !!task.completedAt;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 p-2 rounded-lg border border-border/50 bg-background/50 text-sm">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => isDone ? uncompleteTask(task.id) : completeTask(task.id)}
          className="accent-primary h-3.5 w-3.5 flex-shrink-0"
        />
        <span className={isDone ? "line-through text-muted-foreground" : ""}>{task.title}</span>
      </div>
      {subtasks.map((sub) => (
        <div key={sub.id} className="ml-5">
          <SubtaskRow task={sub} />
        </div>
      ))}
    </div>
  );
}
