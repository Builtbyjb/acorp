import { useMemo } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { TaskList } from "@/components/tasks/TaskList";
import { format } from "date-fns";

export function UpcomingPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const upcomingTasks = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const sevenDays = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];
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
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div>
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-500 mb-2">
          Schedule
        </p>
        <h1 className="text-2xl font-bold text-black">Upcoming</h1>
        <p className="text-sm mt-1 text-neutral-500">Next 7 days</p>
      </div>

      {upcomingTasks.length === 0 ? (
        <p className="text-sm text-center py-12 text-neutral-500">
          Nothing coming up in the next 7 days
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([date, tasks]) => (
            <div key={date} className="flex flex-col gap-3">
              <div className="flex items-center gap-3 border-b border-black/10 pb-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-neutral-500">
                  {date !== "No date"
                    ? format(new Date(date + "T00:00:00"), "EEEE, MMM d")
                    : "No date"}
                </p>
              </div>
              <div className="bg-white border border-black/10 p-6">
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
