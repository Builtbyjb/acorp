import { Link } from "@tanstack/react-router";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="w-7 h-7 bg-black flex items-center justify-center text-white text-xs font-black transition-transform group-hover:scale-95">
        A
      </div>
      <span className="font-bold text-lg tracking-tight text-black">
        Corp
      </span>
    </Link>
  );
}
