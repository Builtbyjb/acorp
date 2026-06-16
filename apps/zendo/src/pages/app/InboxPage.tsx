import { useState, useMemo } from "react";
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
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div>
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-500 mb-2">
          Uncategorised
        </p>
        <h1 className="text-2xl font-bold text-black">Inbox</h1>
        <p className="text-sm mt-1 text-neutral-500">
          Tasks not assigned to a project · {inboxTasks.length} task{inboxTasks.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="bg-white border border-black/10 p-6">
        <TaskList
          tasks={inboxTasks}
          emptyMessage="Inbox zero — nothing uncategorised"
          showAddButton={false}
        />
      </div>

      <button
        className="hidden md:flex items-center gap-2 text-sm font-medium text-neutral-500 hover:opacity-60 transition-opacity"
        onClick={() => setAdding(true)}
      >
        + Add to inbox
      </button>

      <FAB onClick={() => setAdding(true)} label="Add to inbox" />

      <ResponsiveModal open={adding} onOpenChange={(v) => !v && setAdding(false)} title="New task">
        <TaskForm onSuccess={() => setAdding(false)} onCancel={() => setAdding(false)} />
      </ResponsiveModal>
    </div>
  );
}

export default InboxPage;
