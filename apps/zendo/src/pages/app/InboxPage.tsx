import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useTaskStore } from "@/stores/taskStore";
import { TaskList } from "@/components/tasks/TaskList";
import { FAB } from "@/components/app/FAB";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { TaskForm } from "@/components/tasks/TaskForm";

export function InboxPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const inboxTasks = useMemo(() => {
    return tasks.filter((t) => !t.projectId && !t.parentId).sort((a, b) => a.order - b.order);
  }, [tasks]);
  const [adding, setAdding] = useState(false);

  return (
    <div className="h-full p-4 md:p-6 bg-zendo-cream">
      <div className="mb-6">
        <p className="data-label mb-2">Uncategorised</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zendo-ink">Inbox</h1>
            <p className="text-sm mt-1 text-zendo-ink-light">
              Tasks not assigned to a project · {inboxTasks.length} task{inboxTasks.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-zendo-coral rounded-full shadow-lg shadow-zendo-coral/20 hover:bg-zendo-coral/90 transition-colors"
            onClick={() => setAdding(true)}
          >
            <Plus className="h-4 w-4" /> Add task
          </button>
        </div>
      </div>

      <div className="bg-white border border-zendo-ink/8 rounded-2xl p-6 shadow-sm max-w-3xl">
        <TaskList
          tasks={inboxTasks}
          emptyMessage="Inbox zero — nothing uncategorised"
          showAddButton={false}
        />
      </div>

      <FAB onClick={() => setAdding(true)} label="Add to inbox" />

      <ResponsiveModal open={adding} onOpenChange={(v) => !v && setAdding(false)} title="New task">
        <TaskForm onSuccess={() => setAdding(false)} onCancel={() => setAdding(false)} />
      </ResponsiveModal>
    </div>
  );
}

export default InboxPage;
