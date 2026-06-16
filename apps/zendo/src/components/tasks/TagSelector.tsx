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
    const tag = addTag(newTagName.trim(), "#000000");
    onChange([...selectedIds, tag.id]);
    setNewTagName("");
  };

  const selectedTags = tags.filter((t) => selectedIds.includes(t.id));

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {selectedTags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 border border-black/10 px-2 py-0.5 text-[10px] text-neutral-500 font-mono"
        >
          {tag.name}
          <button onClick={() => toggle(tag.id)} className="hover:opacity-60">
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 border border-dashed border-black/10 rounded-none hover:bg-black/5">
            <Tag className="h-3 w-3 text-neutral-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3 rounded-none border border-black/10" align="start">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">Tags</p>

            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggle(tag.id)}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-black/5 text-sm transition-colors text-left"
                >
                  <span className="h-2.5 w-2.5 flex-shrink-0 border border-black/10" />
                  <span className="flex-1 text-left truncate text-neutral-600">{tag.name}</span>
                  {selectedIds.includes(tag.id) && <Check className="h-3.5 w-3.5 text-black" />}
                </button>
              ))}
            </div>

            <div className="border-t border-black/10 pt-2 flex flex-col gap-2">
              <div className="flex gap-1.5">
                <Input
                  placeholder="New tag…"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  className="h-7 text-xs border border-black/10 bg-transparent rounded-none"
                />
                <Button size="icon" className="h-7 w-7 flex-shrink-0 rounded-none bg-black text-white hover:bg-neutral-800" onClick={handleCreate}>
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
