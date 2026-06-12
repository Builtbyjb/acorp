import { useState } from "react";
import { Check, Plus, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/stores/taskStore";

const TAG_COLORS = [
  "#a855f7", "#3b82f6", "#22c55e", "#f59e0b",
  "#ef4444", "#ec4899", "#14b8a6", "#f97316",
];

interface Props {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function TagSelector({ selectedIds, onChange }: Props) {
  const tags = useTaskStore((s) => s.tags);
  const addTag = useTaskStore((s) => s.addTag);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(TAG_COLORS[0]);

  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id]
    );
  };

  const handleCreate = () => {
    if (!newTagName.trim()) return;
    const tag = addTag(newTagName.trim(), newTagColor);
    onChange([...selectedIds, tag.id]);
    setNewTagName("");
    setNewTagColor(TAG_COLORS[0]);
  };

  const selectedTags = tags.filter((t) => selectedIds.includes(t.id));

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {selectedTags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ background: tag.color + "25", color: tag.color }}
        >
          {tag.name}
          <button onClick={() => toggle(tag.id)} className="hover:opacity-60">
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-dashed border-border">
            <Tag className="h-3 w-3 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3" align="start">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</p>

            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggle(tag.id)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted/60 text-sm transition-colors"
                >
                  <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: tag.color }} />
                  <span className="flex-1 text-left truncate">{tag.name}</span>
                  {selectedIds.includes(tag.id) && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              ))}
            </div>

            <div className="border-t border-border pt-2 flex flex-col gap-2">
              <div className="flex gap-1">
                {TAG_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setNewTagColor(c)}
                    className={cn(
                      "h-4 w-4 rounded-full border-2 flex-shrink-0 transition-transform",
                      newTagColor === c ? "border-foreground scale-110" : "border-transparent"
                    )}
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="flex gap-1.5">
                <Input
                  placeholder="New tag…"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  className="h-7 text-xs"
                />
                <Button size="icon" className="h-7 w-7 flex-shrink-0" onClick={handleCreate}>
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
