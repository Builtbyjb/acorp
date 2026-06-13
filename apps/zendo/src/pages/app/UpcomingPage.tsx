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
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div>
        <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "#7F8CAA" }}>
          Schedule
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>Upcoming</h1>
        <p className="text-sm mt-1" style={{ color: "#7F8CAA" }}>Next 7 days</p>
      </div>

      {upcomingTasks.length === 0 ? (
        <p className="text-sm text-center py-12" style={{ color: "#7F8CAA" }}>
          Nothing coming up in the next 7 days
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([date, tasks]) => (
            <div key={date} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <p
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: "#7F8CAA" }}
                >
                  {date !== "No date"
                    ? format(new Date(date + "T00:00:00"), "EEEE, MMM d")
                    : "No date"}
                </p>
                <div className="flex-1 h-px" style={{ backgroundColor: "#7F8CAA20" }} />
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
