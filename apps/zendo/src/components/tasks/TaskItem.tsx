import { useState } from "react";
import { ChevronRight, GripVertical, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useTaskStore, type Task } from "@/stores/taskStore";
import { PriorityDot } from "./PrioritySelector";
import { StageBadge } from "./StageSelector";
import { TaskForm } from "./TaskForm";

interface Props {
  task: Task;
  depth?: number;
  onOpenDetail: (task: Task) => void;
}

const DEPTH_INDENT = [0, 20, 36];
const MAX_DEPTH = 2;

export function TaskItem({ task, depth = 0, onOpenDetail }: Props) {
  const [expanded, setExpanded] = useState(true);
  const [addingChild, setAddingChild] = useState(false);
  const { completeTask, uncompleteTask, deleteTask, getTasksByParent } = useTaskStore();

  const subtasks = getTasksByParent(task.id);
  const hasChildren = subtasks.length > 0;
  const canAddChild = depth < MAX_DEPTH;
  const isDone = !!task.completedAt;

  const toggleDone = () => {
    if (isDone) uncompleteTask(task.id);
    else completeTask(task.id);
  };

  const tags = useTaskStore((s) => s.tags.filter((t) => task.tags.includes(t.id)));

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "group flex items-start gap-2 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-border hover:bg-muted/30",
          isDone && "opacity-50"
        )}
        style={{ paddingLeft: `${DEPTH_INDENT[depth] + 8}px` }}
      >
        {/* Grip (desktop only) */}
        <GripVertical className="hidden md:block h-4 w-4 mt-0.5 text-transparent group-hover:text-muted-foreground flex-shrink-0 cursor-grab" />

        {/* Expand toggle */}
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="h-5 w-5 flex items-center justify-center mt-0.5 flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-90")} />
          </button>
        ) : (
          <span className="h-5 w-5 flex-shrink-0" />
        )}

        {/* Checkbox */}
        <Checkbox
          checked={isDone}
          onCheckedChange={toggleDone}
          className="mt-0.5 flex-shrink-0"
        />

        {/* Content — click to open detail */}
        <button
          className="flex-1 min-w-0 text-left flex flex-col gap-0.5"
          onClick={() => onOpenDetail(task)}
        >
          <span className={cn("text-sm font-medium text-foreground leading-snug", isDone && "line-through text-muted-foreground")}>
            {task.title}
          </span>
          {task.description && (
            <span className="text-xs text-muted-foreground truncate">{task.description}</span>
          )}
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <PriorityDot priority={task.priority} />
            <StageBadge stageId={task.stageId} />
            {task.dueDate && (
              <span className="text-[10px] text-muted-foreground">
                {new Date(task.dueDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            )}
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="text-[10px] rounded-full px-1.5 py-0.5 font-medium"
                style={{ background: tag.color + "25", color: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {canAddChild && (
            <Button
              variant="ghost" size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={() => setAddingChild(true)}
              title="Add subtask"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost" size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task.id)}
            title="Delete task"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Inline add subtask form */}
      {addingChild && (
        <div
          className="mx-2 mb-2 p-3 rounded-xl border border-border bg-card"
          style={{ marginLeft: `${DEPTH_INDENT[depth] + 28}px` }}
        >
          <TaskForm
            parentId={task.id}
            parentLevel={depth as 0 | 1}
            onSuccess={() => setAddingChild(false)}
            onCancel={() => setAddingChild(false)}
          />
        </div>
      )}

      {/* Subtasks */}
      {hasChildren && expanded && (
        <div className="flex flex-col">
          {subtasks.map((sub) => (
            <TaskItem
              key={sub.id}
              task={sub}
              depth={Math.min(depth + 1, MAX_DEPTH) as 0 | 1 | 2}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
}
