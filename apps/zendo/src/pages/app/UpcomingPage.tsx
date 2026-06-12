import { useTaskStore } from "@/stores/taskStore";
import { TaskList } from "@/components/tasks/TaskList";
import { format } from "date-fns";

export function UpcomingPage() {
  const upcomingTasks = useTaskStore((s) => s.getUpcomingTasks());

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
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upcoming</h1>
        <p className="text-sm text-muted-foreground mt-1">Next 7 days</p>
      </div>

      {upcomingTasks.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-12">
          Nothing coming up in the next 7 days
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([date, tasks]) => (
            <div key={date} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {date !== "No date"
                    ? format(new Date(date + "T00:00:00"), "EEEE, MMM d")
                    : "No date"}
                </p>
                <div className="flex-1 h-px bg-border" />
              </div>
              <TaskList tasks={tasks} emptyMessage="" showAddButton={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingPage;
