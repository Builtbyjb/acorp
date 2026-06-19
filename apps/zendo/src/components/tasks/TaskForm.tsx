import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TagSelector } from "./TagSelector";
import { PrioritySelector } from "./PrioritySelector";
import { useTaskStore, type Priority, type Task } from "@/stores/taskStore";
import { cn } from "@/lib/utils";

function validateTitle(value: string) {
  const result = z.string().min(1, "Title is required").max(200, "Too long").safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

interface Props {
  parentId?: string;
  parentLevel?: 0 | 1;
  projectId?: string;
  sectionId?: string;
  initialValues?: Partial<Task>;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TaskForm({ parentId, parentLevel, projectId, sectionId, initialValues, onSuccess, onCancel }: Props) {
  const { stages, addTask, updateTask, projects, sections } = useTaskStore();
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  const defaultStage = sortedStages[0]?.id ?? "";

  const [tags, setTags] = useState<string[]>(initialValues?.tags ?? []);
  const [priority, setPriority] = useState<Priority>(initialValues?.priority ?? "none");
  const [selProject, setSelProject] = useState(projectId ?? initialValues?.projectId ?? "");
  const [selSection, setSelSection] = useState(sectionId ?? initialValues?.sectionId ?? "");

  const filteredSections = sections.filter((s) => s.projectId === selProject);

  const form = useForm({
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      stageId: initialValues?.stageId ?? defaultStage,
      dueDate: initialValues?.dueDate ?? "",
    },
    onSubmit: async ({ value }) => {
      if (initialValues?.id) {
        updateTask(initialValues.id, {
          title: value.title,
          description: value.description,
          stageId: value.stageId,
          dueDate: value.dueDate || undefined,
          tags,
          priority,
          projectId: selProject || undefined,
          sectionId: selSection || undefined,
        });
      } else {
        const level = parentId
          ? (((parentLevel ?? 0) + 1) as 0 | 1 | 2)
          : 0;
        addTask({
          title: value.title,
          description: value.description,
          stageId: value.stageId,
          dueDate: value.dueDate || undefined,
          tags,
          priority,
          level,
          parentId,
          projectId: parentId ? undefined : (selProject || undefined),
          sectionId: parentId ? undefined : (selSection || undefined),
          completedAt: undefined,
        });
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
            <Label htmlFor="task-title" className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Task name *</Label>
            <Input
              id="task-title"
              placeholder="What needs to be done?"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              autoFocus
              className={cn("border border-zendo-ink/10 bg-zendo-cream/50 rounded-xl h-10 focus-visible:ring-zendo-coral/20", field.state.meta.errors.length > 0 ? "border-destructive" : "")}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-destructive">{field.state.meta.errors[0]?.toString()}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Description */}
      <form.Field name="description">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-desc" className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Description</Label>
            <Textarea
              id="task-desc"
              placeholder="Add details, notes, or context…"
              rows={3}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="resize-none border border-zendo-ink/10 bg-zendo-cream/50 rounded-xl focus-visible:ring-zendo-coral/20"
            />
          </div>
        )}
      </form.Field>

      {/* Row: Stage + Due date */}
      <div className="grid grid-cols-2 gap-3">
        <form.Field name="stageId">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Stage</Label>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger className="h-10 border border-zendo-ink/10 bg-zendo-cream/50 rounded-xl focus:ring-zendo-coral/20">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-zendo-ink/10 bg-white">
                  {sortedStages.map((s) => (
                    <SelectItem key={s.id} value={s.id} className="rounded-lg">{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        <form.Field name="dueDate">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-due" className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Due date</Label>
              <Input id="task-due" type="date" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="h-10 border border-zendo-ink/10 bg-zendo-cream/50 rounded-xl focus-visible:ring-zendo-coral/20" />
            </div>
          )}
        </form.Field>
      </div>

      {/* Project + Section (only for top-level tasks without a fixed project) */}
      {!parentId && !projectId && (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Project</Label>
            <Select value={selProject} onValueChange={(v) => { setSelProject(v); setSelSection(""); }}>
              <SelectTrigger className="h-10 border border-zendo-ink/10 bg-zendo-cream/50 rounded-xl focus:ring-zendo-coral/20">
                <SelectValue placeholder="Inbox" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-zendo-ink/10 bg-white">
                <SelectItem value="" className="rounded-lg">Inbox</SelectItem>
                {projects.filter((p) => !p.archived).map((p) => (
                  <SelectItem key={p.id} value={p.id} className="rounded-lg">{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selProject && filteredSections.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Section</Label>
              <Select value={selSection} onValueChange={setSelSection}>
                <SelectTrigger className="h-10 border border-zendo-ink/10 bg-zendo-cream/50 rounded-xl focus:ring-zendo-coral/20">
                  <SelectValue placeholder="No section" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-zendo-ink/10 bg-white">
                  <SelectItem value="" className="rounded-lg">No section</SelectItem>
                  {filteredSections.map((s) => (
                    <SelectItem key={s.id} value={s.id} className="rounded-lg">{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Priority + Tags */}
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Priority</Label>
          <PrioritySelector value={priority} onChange={setPriority} />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Label className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Tags</Label>
          <TagSelector selectedIds={tags} onChange={setTags} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="rounded-full text-zendo-ink-light hover:text-zendo-ink hover:bg-zendo-ink/5">Cancel</Button>
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" size="sm" disabled={!canSubmit || isSubmitting} className="rounded-full bg-zendo-coral text-white hover:bg-zendo-coral/90 shadow-sm shadow-zendo-coral/20">
              {isSubmitting ? "Saving…" : initialValues?.id ? "Save changes" : "Add task"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
