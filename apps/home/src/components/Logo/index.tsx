import { Link } from "@tanstack/react-router";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black transition-transform group-hover:scale-95"
        style={{ backgroundColor: "#4382df" }}
      >
        A
      </div>
      <span className="font-bold text-lg tracking-tight" style={{ color: "#0f172a" }}>
        Corp
      </span>
    </Link>
  );
}
