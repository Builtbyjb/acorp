import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Send, FileDown, Share2 } from "lucide-react";

const QUEUE_KEY = "insights_submission_queue";

const storage = {
  getItem: (key: string): string | null => localStorage.getItem(key),
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
};

interface QueuedSubmission {
  id: string;
  data: Record<string, string>;
  timestamp: number;
}

export const Route = createFileRoute("/_authenticated/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [queue, setQueue] = useState<QueuedSubmission[]>(() => {
    const raw = storage.getItem(QUEUE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });
  const [status, setStatus] = useState("");
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  const saveQueue = useCallback((next: QueuedSubmission[]) => {
    setQueue(next);
    storage.setItem(QUEUE_KEY, JSON.stringify(next));
  }, []);

  const flushQueue = useCallback(async () => {
    if (queue.length === 0) return;
    const next = [...queue];
    const failed: QueuedSubmission[] = [];
    for (const item of next) {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (Math.random() > 0.1) {
        // 90% success
        continue;
      }
      failed.push(item);
    }
    saveQueue(failed);
    if (failed.length === 0) setStatus("Offline queue flushed.");
  }, [queue, saveQueue]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      flushQueue();
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [flushQueue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;

    const submission: QueuedSubmission = {
      id: crypto.randomUUID(),
      data: { name, value },
      timestamp: Date.now(),
    };

    if (isOnline) {
      setStatus("Submitted online.");
    } else {
      const next = [submission, ...queue];
      saveQueue(next);
      setStatus("Saved to offline queue.");
    }
    setName("");
    setValue("");
  };

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      totalQueued: queue.length,
      online: isOnline,
      submissions: queue,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insights-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareReport = async () => {
    const summary = `Insights report: ${queue.length} items queued. Online: ${isOnline}.`;
    if (navigator.share) {
      await navigator.share({ title: "Insights Report", text: summary });
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold">Insights</h1>
        <p className="text-sm text-muted-foreground">Offline-ready data collection and reporting.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Network status</CardTitle>
          <CardDescription>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-1 ${isOnline ? "border-transparent bg-primary text-primary-foreground" : "border-transparent bg-secondary text-secondary-foreground"}`}>
              <Network className="mr-1 h-3 w-3" />
              {isOnline ? "Online" : "Offline"}
            </span>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Submit data</CardTitle>
          <CardDescription>Entries are queued when offline and flushed automatically when connectivity returns.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Metric name</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. NPS Score"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="value" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Value</label>
              <input
                id="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 42"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                {isOnline ? "Submit" : "Queue"}
              </Button>
              <Button type="button" variant="outline" onClick={flushQueue} disabled={queue.length === 0}>
                Flush queue ({queue.length})
              </Button>
            </div>
            {status && <p className="text-sm text-muted-foreground">{status}</p>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Reports</CardTitle>
          <CardDescription>Export or share the current report.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Button variant="outline" onClick={exportReport}>
            <FileDown className="mr-2 h-4 w-4" />
            Export JSON
          </Button>
          <Button variant="outline" onClick={shareReport}>
            <Share2 className="mr-2 h-4 w-4" />
            Share summary
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
