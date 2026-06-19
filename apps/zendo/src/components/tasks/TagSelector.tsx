import { useState } from "react";
import { Check, Plus, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTaskStore } from "@/stores/taskStore";

interface Props {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function TagSelector({ selectedIds, onChange }: Props) {
  const tags = useTaskStore((s) => s.tags);
  const addTag = useTaskStore((s) => s.addTag);
  const [newTagName, setNewTagName] = useState("");

  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id]
    );
  };

  const handleCreate = () => {
    if (!newTagName.trim()) return;
    const tag = addTag(newTagName.trim(), "#f27a5d");
    onChange([...selectedIds, tag.id]);
    setNewTagName("");
  };

  const selectedTags = tags.filter((t) => selectedIds.includes(t.id));

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {selectedTags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 border border-zendo-ink/10 px-2 py-0.5 text-[10px] text-zendo-ink-light font-mono rounded-full"
        >
          {tag.name}
          <button onClick={() => toggle(tag.id)} className="hover:text-zendo-coral transition-colors">
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 border border-dashed border-zendo-ink/15 rounded-lg hover:bg-zendo-coral/5 hover:border-zendo-coral/30 hover:text-zendo-coral">
            <Tag className="h-3 w-3 text-zendo-ink-light" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3 rounded-xl border border-zendo-ink/10 bg-white" align="start">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-zendo-ink-light">Tags</p>

            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggle(tag.id)}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-zendo-coral/5 text-sm transition-colors text-left rounded-lg"
                >
                  <span className="h-2.5 w-2.5 flex-shrink-0 rounded-sm border border-zendo-ink/10" style={{ backgroundColor: tag.color }} />
                  <span className="flex-1 text-left truncate text-zendo-ink-light">{tag.name}</span>
                  {selectedIds.includes(tag.id) && <Check className="h-3.5 w-3.5 text-zendo-coral" />}
                </button>
              ))}
            </div>

            <div className="border-t border-zendo-ink/10 pt-2 flex flex-col gap-2">
              <div className="flex gap-1.5">
                <Input
                  placeholder="New tag…"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  className="h-7 text-xs border border-zendo-ink/10 bg-zendo-cream/50 rounded-lg focus-visible:ring-zendo-coral/20"
                />
                <Button size="icon" className="h-7 w-7 flex-shrink-0 rounded-full bg-zendo-coral text-white hover:bg-zendo-coral/90" onClick={handleCreate}>
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
