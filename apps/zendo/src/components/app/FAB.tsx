import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function FAB({ onClick, label = "Add", className }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "md:hidden fixed bottom-[calc(env(safe-area-inset-bottom)+72px)] right-4 z-40",
        "w-14 h-14 bg-black text-white",
        "flex items-center justify-center",
        "active:scale-95 transition-transform",
        className
      )}
    >
      <Plus className="h-6 w-6" />
    </button>
  );
}
