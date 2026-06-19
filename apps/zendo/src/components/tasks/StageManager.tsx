import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { useTaskStore } from "@/stores/taskStore";

const STAGE_COLORS = [
  "#f27a5d", "#8fb996", "#7ec8e3", "#ffe07a",
  "#c9b8e8", "#9fe2c4", "#6b6560", "#2d2a26",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function StageManager({ open, onClose }: Props) {
  const { stages, addStage, updateStage, deleteStage } = useTaskStore();
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(STAGE_COLORS[0]);
  const sorted = [...stages].sort((a, b) => a.order - b.order);

  const handleAdd = () => {
    if (!newName.trim()) return;
    addStage(newName.trim(), newColor);
    setNewName("");
    setNewColor(STAGE_COLORS[0]);
  };

  return (
    <ResponsiveModal open={open} onOpenChange={(v) => !v && onClose()} title="Manage stages">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zendo-ink-light">
          Stages control the workflow of your tasks. Reorder, rename, or add new ones.
        </p>

        <div className="flex flex-col gap-2">
          {sorted.map((stage) => (
            <div key={stage.id} className="flex items-center gap-2 rounded-xl border border-zendo-ink/10 px-3 py-2 bg-white">
              <GripVertical className="h-4 w-4 text-zendo-ink-light flex-shrink-0" />
              <input
                type="color"
                value={stage.color}
                onChange={(e) => updateStage(stage.id, { color: e.target.value })}
                className="w-5 h-5 rounded-full border-0 cursor-pointer flex-shrink-0 bg-transparent"
              />
              <Input
                value={stage.name}
                onChange={(e) => updateStage(stage.id, { name: e.target.value })}
                className="flex-1 h-7 border-0 text-sm bg-transparent focus-visible:ring-0 px-0 text-zendo-ink"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-zendo-ink-light hover:text-destructive flex-shrink-0 rounded-lg"
                onClick={() => deleteStage(stage.id)}
                disabled={sorted.length <= 1}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add new stage */}
        <div className="flex gap-2 border-t border-zendo-ink/10 pt-3">
          <div className="flex gap-1.5 flex-wrap">
            {STAGE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                className={`h-5 w-5 rounded-full border-2 transition-transform ${newColor === c ? "border-zendo-ink scale-110" : "border-transparent"}`}
                style={{ background: c }}
              />
            ))}
          </div>
          <Input
            placeholder="New stage name…"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 h-8 text-sm border-zendo-ink/10 bg-zendo-cream/50 rounded-lg focus-visible:ring-zendo-coral/20"
          />
          <Button size="sm" onClick={handleAdd} disabled={!newName.trim()} className="rounded-full bg-zendo-coral text-white hover:bg-zendo-coral/90">
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        <Button className="w-full rounded-full bg-zendo-ink text-white hover:bg-zendo-ink/90" onClick={onClose}>Done</Button>
      </div>
    </ResponsiveModal>
  );
}
