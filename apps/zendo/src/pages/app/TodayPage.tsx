import { useState, useMemo } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { TaskList } from "@/components/tasks/TaskList";
import { FAB } from "@/components/app/FAB";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { TaskForm } from "@/components/tasks/TaskForm";

export function TodayPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const todayTasks = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter((t) => t.dueDate === today && !t.parentId).sort((a, b) => a.order - b.order);
  }, [tasks]);
  const [adding, setAdding] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div>
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-500 mb-2">
          Dashboard
        </p>
        <h1 className="text-2xl font-bold text-black">Today</h1>
        <p className="text-sm mt-1 text-neutral-500">{today}</p>
      </div>

      <div className="bg-white border border-black/10 p-6">
        <TaskList
          tasks={todayTasks}
          emptyMessage="Nothing due today — enjoy the calm"
          showAddButton={false}
        />
      </div>

      {/* Desktop add button */}
      <button
        className="hidden md:flex items-center gap-2 text-sm font-medium text-neutral-500 hover:opacity-60 transition-opacity"
        onClick={() => setAdding(true)}
      >
        + Add task for today
      </button>

      {/* Mobile FAB */}
      <FAB onClick={() => setAdding(true)} label="Add task" />

      <ResponsiveModal open={adding} onOpenChange={(v) => !v && setAdding(false)} title="New task">
        <TaskForm
          initialValues={{ dueDate: new Date().toISOString().split("T")[0] }}
          onSuccess={() => setAdding(false)}
          onCancel={() => setAdding(false)}
        />
      </ResponsiveModal>
    </div>
  );
}

export default TodayPage;
