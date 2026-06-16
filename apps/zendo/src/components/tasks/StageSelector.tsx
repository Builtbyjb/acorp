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
        <button className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider border border-black/10 text-neutral-500 hover:text-black hover:border-black/30 transition-colors bg-white">
          {current.name}
          <ChevronDown className="h-3 w-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-none border border-black/10">
        {stages.map((stage) => (
          <DropdownMenuItem
            key={stage.id}
            onClick={() => onChange(stage.id)}
            className="gap-2 rounded-none"
          >
            <span className="h-2 w-2 flex-shrink-0 bg-neutral-500" />
            {stage.name}
            {stage.id === stageId && <span className="ml-auto text-xs text-neutral-500">✓</span>}
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
    <span className="inline-flex items-center px-2 py-0 text-[10px] font-bold uppercase tracking-wider border border-black/10 text-neutral-500 bg-white">
      {stage.name}
    </span>
  );
}
