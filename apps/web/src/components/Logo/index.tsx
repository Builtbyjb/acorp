import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { APP_NAME } from "@/lib/constant";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <FileText className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold tracking-tight">{APP_NAME}</span>
    </Link>
  );
}
