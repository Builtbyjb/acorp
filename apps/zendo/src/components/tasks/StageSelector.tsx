import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useTaskStore } from "@/stores/taskStore";

interface Props {
  stageId: string;
  onChange: (stageId: string) => void;
}

export function StageSelector({ stageId, onChange }: Props) {
  const allStages = useTaskStore((s) => s.stages);
  const stages = useMemo(() => [...allStages].sort((a, b) => a.order - b.order), [allStages]);
  const current = stages.find((s) => s.id === stageId) ?? stages[0];

  if (!current) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-zendo-ink/10 text-zendo-ink-light hover:text-zendo-ink hover:border-zendo-coral/30 transition-colors bg-white rounded-full">
          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: current.color }} />
          {current.name}
          <ChevronDown className="h-3 w-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-xl border border-zendo-ink/10 bg-white">
        {stages.map((stage) => (
          <DropdownMenuItem
            key={stage.id}
            onClick={() => onChange(stage.id)}
            className="gap-2 rounded-lg cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: stage.color }} />
            {stage.name}
            {stage.id === stageId && <span className="ml-auto text-xs text-zendo-ink-light">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function StageBadge({ stageId }: { stageId: string }) {
  const stage = useTaskStore((s) => s.stages.find((st) => st.id === stageId));
  if (!stage) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-zendo-ink/10 text-zendo-ink-light bg-white rounded-full">
      <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: stage.color }} />
      {stage.name}
    </span>
  );
}
