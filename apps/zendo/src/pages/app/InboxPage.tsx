import { useState } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { TaskList } from "@/components/tasks/TaskList";
import { FAB } from "@/components/app/FAB";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { TaskForm } from "@/components/tasks/TaskForm";

export function InboxPage() {
  const inboxTasks = useTaskStore((s) => s.getInboxTasks());
  const [adding, setAdding] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div>
        <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "#7F8CAA" }}>
          Uncategorised
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>Inbox</h1>
        <p className="text-sm mt-1" style={{ color: "#7F8CAA" }}>
          Tasks not assigned to a project · {inboxTasks.length} task{inboxTasks.length !== 1 ? "s" : ""}
        </p>
      </div>

      <TaskList
        tasks={inboxTasks}
        emptyMessage="Inbox zero — nothing uncategorised"
        showAddButton={false}
      />

      <button
        className="hidden md:flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
        style={{ color: "#7F8CAA" }}
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
