import { Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Priority } from "@/stores/taskStore";

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: "high",   label: "High",   color: "text-black" },
  { value: "medium", label: "Medium", color: "text-neutral-600" },
  { value: "low",    label: "Low",    color: "text-neutral-400" },
  { value: "none",   label: "None",   color: "text-neutral-500" },
];

interface Props {
  value: Priority;
  onChange: (value: Priority) => void;
  size?: "sm" | "default";
}

export function PrioritySelector({ value, onChange, size = "sm" }: Props) {
  const current = PRIORITIES.find((p) => p.value === value) ?? PRIORITIES[3];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={size === "sm" ? "icon" : "sm"}
          className={cn("h-7 w-7 rounded-none", current.color)}
          title={`Priority: ${current.label}`}
        >
          <Flag className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-none border border-black/10">
        {PRIORITIES.map((p) => (
          <DropdownMenuItem
            key={p.value}
            onClick={() => onChange(p.value)}
            className={cn("gap-2 rounded-none", p.color)}
          >
            <Flag className="h-3.5 w-3.5" />
            {p.label}
            {p.value === value && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PriorityDot({ priority }: { priority: Priority }) {
  const colors: Record<Priority, string> = {
    high:   "bg-black",
    medium: "bg-neutral-600",
    low:    "bg-neutral-400",
    none:   "bg-transparent border border-black/10",
  };
  return (
    <span className={cn("inline-block h-2 w-2 flex-shrink-0", colors[priority])} />
  );
}
