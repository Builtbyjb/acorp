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
        "w-14 h-14 rounded-full bg-zendo-coral text-white shadow-lg shadow-zendo-coral/25",
        "flex items-center justify-center",
        "active:scale-95 transition-transform hover:bg-zendo-coral/90",
        className
      )}
    >
      <Plus className="h-6 w-6" />
    </button>
  );
}
