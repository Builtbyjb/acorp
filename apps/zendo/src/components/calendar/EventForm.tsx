import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RecurrenceBuilder } from "./RecurrenceBuilder";
import { useCalendarStore, EVENT_COLORS, type CalEvent, type RecurrenceRule } from "@/stores/calendarStore";
import { cn } from "@/lib/utils";

const titleSchema = z.string().min(1, "Title is required").max(200, "Too long");

function validateTitle(v: string) {
  const r = titleSchema.safeParse(v);
  return r.success ? undefined : r.error.issues[0]?.message;
}

interface Props {
  initialValues?: Partial<CalEvent>;
  defaultDate?: string;
  onSuccess: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export function EventForm({ initialValues, defaultDate, onSuccess, onCancel, onDelete }: Props) {
  const { addEvent, updateEvent } = useCalendarStore();
  const isEditing = !!initialValues?.id;

  const defaultStart = initialValues?.start
    ? initialValues.start.slice(0, 16)
    : (defaultDate ?? new Date().toISOString().slice(0, 16));
  const defaultEnd = initialValues?.end
    ? initialValues.end.slice(0, 16)
    : (defaultDate ?? new Date(new Date().getTime() + 3600000).toISOString().slice(0, 16));

  const [allDay, setAllDay] = useState(initialValues?.allDay ?? false);
  const [color, setColor] = useState(initialValues?.color ?? EVENT_COLORS[0]);
  const [recurrence, setRecurrence] = useState<RecurrenceRule | undefined>(
    initialValues?.recurrence
  );

  const form = useForm({
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      start: allDay ? defaultStart.slice(0, 10) : defaultStart,
      end: allDay ? defaultEnd.slice(0, 10) : defaultEnd,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        title: value.title,
        description: value.description,
        start: allDay ? value.start.slice(0, 10) : value.start,
        end: allDay ? value.end.slice(0, 10) : value.end,
        allDay,
        color,
        recurrence,
      };

      if (isEditing && initialValues?.id) {
        updateEvent(initialValues.id, payload);
      } else {
        addEvent(payload);
      }
      onSuccess();
    },
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}
      className="flex flex-col gap-4"
    >
      {/* Title */}
      <form.Field name="title" validators={{ onChange: ({ value }) => validateTitle(value) }}>
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ev-title" className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Event title *</Label>
            <Input
              id="ev-title"
              autoFocus
              placeholder="Add title"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "rounded-xl border-zendo-ink/10 bg-zendo-cream/50 focus-visible:ring-zendo-coral/20",
                field.state.meta.errors.length > 0 && "border-destructive"
              )}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">{field.state.meta.errors[0]?.toString()}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* All-day toggle */}
      <div className="flex items-center justify-between">
        <Label htmlFor="all-day" className="text-sm text-zendo-ink-light">All-day event</Label>
        <Switch id="all-day" checked={allDay} onCheckedChange={setAllDay} />
      </div>

      {/* Start / End */}
      <div className="grid grid-cols-2 gap-3">
        <form.Field name="start">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ev-start" className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Start</Label>
              <Input
                id="ev-start"
                type={allDay ? "date" : "datetime-local"}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="h-9 text-xs rounded-xl border-zendo-ink/10 bg-zendo-cream/50 focus-visible:ring-zendo-coral/20"
              />
            </div>
          )}
        </form.Field>
        <form.Field name="end">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ev-end" className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">End</Label>
              <Input
                id="ev-end"
                type={allDay ? "date" : "datetime-local"}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="h-9 text-xs rounded-xl border-zendo-ink/10 bg-zendo-cream/50 focus-visible:ring-zendo-coral/20"
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* Color */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Color</Label>
        <div className="flex gap-2 flex-wrap">
          {EVENT_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={cn(
                "w-7 h-7 rounded-full border-2 transition-transform",
                color === c ? "border-zendo-ink scale-110" : "border-transparent"
              )}
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <form.Field name="description">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ev-desc" className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Description</Label>
            <Textarea
              id="ev-desc"
              placeholder="Add description…"
              rows={2}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="resize-none text-sm rounded-xl border-zendo-ink/10 bg-zendo-cream/50 focus-visible:ring-zendo-coral/20"
            />
          </div>
        )}
      </form.Field>

      <Separator className="bg-zendo-ink/10" />

      {/* Recurrence */}
      <RecurrenceBuilder value={recurrence} onChange={setRecurrence} />

      <Separator className="bg-zendo-ink/10" />

      {/* Actions */}
      <div className="flex justify-between gap-2">
        <div>
          {onDelete && (
            <Button type="button" size="sm" onClick={onDelete} className="rounded-full bg-destructive text-white hover:bg-destructive/90">
              Delete
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="rounded-full text-zendo-ink-light hover:text-zendo-ink hover:bg-zendo-ink/5">Cancel</Button>
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" size="sm" disabled={!canSubmit || isSubmitting} className="rounded-full bg-zendo-coral text-white hover:bg-zendo-coral/90 shadow-sm shadow-zendo-coral/20">
                {isSubmitting ? "Saving…" : isEditing ? "Save changes" : "Create event"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </div>
    </form>
  );
}
