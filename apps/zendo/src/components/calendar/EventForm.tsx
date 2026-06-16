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
    : (defaultDate ?? new Date(Date.now() + 3600000).toISOString().slice(0, 16));

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
            <Label htmlFor="ev-title" className="font-mono uppercase text-xs tracking-wider">Event title *</Label>
            <Input
              id="ev-title"
              autoFocus
              placeholder="Add title"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "rounded-none border-black/10 bg-transparent",
                field.state.meta.errors.length > 0 && "border-black"
              )}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-black">{field.state.meta.errors[0]?.toString()}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* All-day toggle */}
      <div className="flex items-center justify-between">
        <Label htmlFor="all-day" className="text-sm font-mono uppercase text-xs tracking-wider">All-day event</Label>
        <Switch id="all-day" checked={allDay} onCheckedChange={setAllDay} className="rounded-none" />
      </div>

      {/* Start / End */}
      <div className="grid grid-cols-2 gap-3">
        <form.Field name="start">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ev-start" className="font-mono uppercase text-xs tracking-wider">Start</Label>
              <Input
                id="ev-start"
                type={allDay ? "date" : "datetime-local"}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="h-9 text-xs rounded-none border-black/10 bg-transparent"
              />
            </div>
          )}
        </form.Field>
        <form.Field name="end">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ev-end" className="font-mono uppercase text-xs tracking-wider">End</Label>
              <Input
                id="ev-end"
                type={allDay ? "date" : "datetime-local"}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="h-9 text-xs rounded-none border-black/10 bg-transparent"
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* Color */}
      <div className="flex flex-col gap-1.5">
        <Label className="font-mono uppercase text-xs tracking-wider">Color</Label>
        <div className="flex gap-2 flex-wrap">
          {EVENT_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={cn(
                "w-7 h-7 rounded-none border-2 transition-transform",
                color === c ? "border-black scale-110" : "border-transparent"
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
            <Label htmlFor="ev-desc" className="font-mono uppercase text-xs tracking-wider">Description</Label>
            <Textarea
              id="ev-desc"
              placeholder="Add description…"
              rows={2}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="resize-none text-sm rounded-none border-black/10 bg-transparent"
            />
          </div>
        )}
      </form.Field>

      <Separator className="bg-black/10" />

      {/* Recurrence */}
      <RecurrenceBuilder value={recurrence} onChange={setRecurrence} />

      <Separator className="bg-black/10" />

      {/* Actions */}
      <div className="flex justify-between gap-2">
        <div>
          {onDelete && (
            <Button type="button" size="sm" onClick={onDelete} className="rounded-none bg-black text-white hover:bg-black/90">
              Delete
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="rounded-none border border-black/10">Cancel</Button>
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" size="sm" disabled={!canSubmit || isSubmitting} className="rounded-none bg-black text-white hover:bg-black/90">
                {isSubmitting ? "Saving…" : isEditing ? "Save changes" : "Create event"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </div>
    </form>
  );
}
