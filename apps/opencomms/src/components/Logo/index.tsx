import { Link } from "@tanstack/react-router";

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold transition-transform group-hover:scale-95">
        O
      </div>
      <span className="font-bold text-xl tracking-tighter text-foreground">OpenComms</span>
    </Link>
  );
}
