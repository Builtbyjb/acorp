import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { RecurrenceRule, RecurrenceFreq } from "@/stores/calendarStore";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  value: RecurrenceRule | undefined;
  onChange: (rule: RecurrenceRule | undefined) => void;
}

export function RecurrenceBuilder({ value, onChange }: Props) {
  const enabled = !!value;

  const setEnabled = (on: boolean) => {
    onChange(on ? { freq: "weekly", interval: 1 } : undefined);
  };

  const update = (patch: Partial<RecurrenceRule>) => {
    if (!value) return;
    onChange({ ...value, ...patch });
  };

  const toggleDay = (d: number) => {
    if (!value) return;
    const days = value.daysOfWeek ?? [];
    onChange({
      ...value,
      daysOfWeek: days.includes(d) ? days.filter((x) => x !== d) : [...days, d],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="recurrence-toggle" className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Repeat</Label>
        <Switch id="recurrence-toggle" checked={enabled} onCheckedChange={setEnabled} />
      </div>

      {enabled && value && (
        <div className="flex flex-col gap-3 pl-1">
          {/* Frequency + Interval */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zendo-ink-light font-medium">Every</span>
            <Input
              type="number"
              min={1}
              max={99}
              value={value.interval}
              onChange={(e) => update({ interval: Math.max(1, Number(e.target.value)) })}
              className="w-16 h-8 text-sm text-center rounded-lg border-zendo-ink/10 bg-zendo-cream/50 focus-visible:ring-zendo-coral/20"
            />
            <Select value={value.freq} onValueChange={(v) => update({ freq: v as RecurrenceFreq })}>
              <SelectTrigger className="h-8 flex-1 rounded-lg border-zendo-ink/10 bg-zendo-cream/50 focus:ring-zendo-coral/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-zendo-ink/10 bg-white">
                <SelectItem value="daily" className="rounded-lg">Day{value.interval > 1 ? "s" : ""}</SelectItem>
                <SelectItem value="weekly" className="rounded-lg">Week{value.interval > 1 ? "s" : ""}</SelectItem>
                <SelectItem value="monthly" className="rounded-lg">Month{value.interval > 1 ? "s" : ""}</SelectItem>
                <SelectItem value="yearly" className="rounded-lg">Year{value.interval > 1 ? "s" : ""}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Day-of-week picker for weekly */}
          {value.freq === "weekly" && (
            <div className="flex gap-1.5 flex-wrap">
              {DAYS.map((day, i) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(i)}
                  className={[
                    "w-9 h-9 rounded-lg text-xs font-semibold border transition-colors",
                    (value.daysOfWeek ?? []).includes(i)
                      ? "bg-zendo-coral text-white border-zendo-coral"
                      : "border-zendo-ink/10 text-zendo-ink-light hover:border-zendo-coral/30 hover:text-zendo-coral",
                  ].join(" ")}
                >
                  {day}
                </button>
              ))}
            </div>
          )}

          {/* End condition */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-zendo-ink-light font-bold uppercase tracking-wider">End date</Label>
              <Input
                type="date"
                value={value.endDate ?? ""}
                onChange={(e) => update({ endDate: e.target.value || undefined, count: undefined })}
                className="h-8 text-xs rounded-lg border-zendo-ink/10 bg-zendo-cream/50 focus-visible:ring-zendo-coral/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-zendo-ink-light font-bold uppercase tracking-wider">After occurrences</Label>
              <Input
                type="number"
                min={1}
                max={999}
                placeholder="∞"
                value={value.count ?? ""}
                onChange={(e) => update({ count: e.target.value ? Number(e.target.value) : undefined, endDate: undefined })}
                className="h-8 text-xs rounded-lg border-zendo-ink/10 bg-zendo-cream/50 focus-visible:ring-zendo-coral/20"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
