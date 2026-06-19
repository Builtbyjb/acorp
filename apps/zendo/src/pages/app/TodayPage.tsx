import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useTaskStore } from "@/stores/taskStore";
import { TaskList } from "@/components/tasks/TaskList";
import { FAB } from "@/components/app/FAB";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { TaskForm } from "@/components/tasks/TaskForm";
import { DashboardCalendar } from "@/components/app/DashboardCalendar";
import { DashboardPomodoro } from "@/components/app/DashboardPomodoro";

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
    <div className="h-full p-4 md:p-6 bg-zendo-cream">
      {/* Header */}
      <div className="mb-6">
        <p className="data-label mb-2">Dashboard</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zendo-ink">Today</h1>
            <p className="text-sm mt-1 text-zendo-ink-light">{today}</p>
          </div>
          <button
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-zendo-coral rounded-full shadow-lg shadow-zendo-coral/20 hover:bg-zendo-coral/90 transition-colors"
            onClick={() => setAdding(true)}
          >
            <Plus className="h-4 w-4" /> New task
          </button>
        </div>
      </div>

      {/* Dashboard grid - matches landing preview */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 h-[calc(100%-92px)]">
        {/* Calendar panel */}
        <div className="bg-white border border-zendo-ink/8 rounded-2xl p-5 shadow-sm flex flex-col min-h-[400px]">
          <DashboardCalendar />
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-5">
          <DashboardPomodoro />

          <div className="bg-white border border-zendo-ink/8 rounded-2xl p-5 shadow-sm flex-1 flex flex-col min-h-[280px]">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-3 text-zendo-ink-light">
              Today&apos;s Tasks
            </p>
            <div className="flex-1 overflow-y-auto">
              <TaskList
                tasks={todayTasks}
                emptyMessage="Nothing due today — enjoy the calm"
                showAddButton={false}
              />
            </div>
          </div>
        </div>
      </div>

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
