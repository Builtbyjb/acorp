import { useState } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { TaskList } from "@/components/tasks/TaskList";
import { FAB } from "@/components/app/FAB";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { TaskForm } from "@/components/tasks/TaskForm";

export function TodayPage() {
  const todayTasks = useTaskStore((s) => s.getTodayTasks());
  const [adding, setAdding] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div>
        <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "#7F8CAA" }}>
          Dashboard
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>Today</h1>
        <p className="text-sm mt-1" style={{ color: "#7F8CAA" }}>{today}</p>
      </div>

      <TaskList
        tasks={todayTasks}
        emptyMessage="Nothing due today — enjoy the calm"
        showAddButton={false}
      />

      {/* Desktop add button */}
      <button
        className="hidden md:flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
        style={{ color: "#7F8CAA" }}
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
