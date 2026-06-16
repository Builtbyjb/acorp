import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useTaskStore } from "@/stores/taskStore";

interface Props {
  stageId: string;
  onChange: (stageId: string) => void;
}

export function StageSelector({ stageId, onChange }: Props) {
  const stages = useTaskStore((s) => [...s.stages].sort((a, b) => a.order - b.order));
  const current = stages.find((s) => s.id === stageId) ?? stages[0];

  if (!current) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border transition-colors hover:opacity-80"
          style={{ borderColor: current.color + "50", color: current.color, background: current.color + "18" }}
        >
          {current.name}
          <ChevronDown className="h-3 w-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {stages.map((stage) => (
          <DropdownMenuItem
            key={stage.id}
            onClick={() => onChange(stage.id)}
            className="gap-2"
          >
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: stage.color }} />
            {stage.name}
            {stage.id === stageId && <span className="ml-auto text-xs text-muted-foreground">✓</span>}
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
    <Badge
      variant="outline"
      className="rounded-full text-[10px] px-2 py-0 font-semibold"
      style={{ borderColor: stage.color + "50", color: stage.color, background: stage.color + "15" }}
    >
      {stage.name}
    </Badge>
  );
}
