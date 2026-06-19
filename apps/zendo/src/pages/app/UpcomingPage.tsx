import { useMemo } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { TaskList } from "@/components/tasks/TaskList";
import { format } from "date-fns";

export function UpcomingPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const upcomingTasks = useMemo(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const sevenDays = new Date(now.getTime() + 7 * 86400000).toISOString().split("T")[0];
    return tasks
      .filter((t) => t.dueDate && t.dueDate > today && t.dueDate <= sevenDays && !t.parentId)
      .sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? ""));
  }, [tasks]);

  const grouped = upcomingTasks.reduce<Record<string, typeof upcomingTasks>>(
    (acc, task) => {
      const key = task.dueDate ?? "No date";
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    },
    {}
  );

  return (
    <div className="h-full p-4 md:p-6 bg-zendo-cream">
      <div className="mb-6">
        <p className="data-label mb-2">Schedule</p>
        <div>
          <h1 className="text-2xl font-bold text-zendo-ink">Upcoming</h1>
          <p className="text-sm mt-1 text-zendo-ink-light">Next 7 days</p>
        </div>
      </div>

      {upcomingTasks.length === 0 ? (
        <div className="bg-white border border-zendo-ink/8 rounded-2xl p-12 shadow-sm text-center">
          <p className="text-sm text-zendo-ink-light">Nothing coming up in the next 7 days</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-3xl">
          {Object.entries(grouped).map(([date, tasks]) => (
            <div key={date} className="flex flex-col gap-3">
              <div className="flex items-center gap-3 border-b border-zendo-ink/10 pb-2">
                <p className="data-label">
                  {date !== "No date"
                    ? format(new Date(date + "T00:00:00"), "EEEE, MMM d")
                    : "No date"}
                </p>
              </div>
              <div className="bg-white border border-zendo-ink/8 rounded-2xl p-6 shadow-sm">
                <TaskList tasks={tasks} emptyMessage="" showAddButton={false} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingPage;
