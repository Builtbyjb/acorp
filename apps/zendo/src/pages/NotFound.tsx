import { Link } from "@tanstack/react-router";
import { Home, Search } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-6 py-20 bg-zendo-cream relative overflow-hidden">
      {/* Soft background glows */}
      <div aria-hidden="true" className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-zendo-coral/10 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-zendo-sky/10 blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center text-center gap-6 max-w-lg">
        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl bg-white border border-zendo-ink/10 shadow-xl shadow-zendo-ink/5 flex items-center justify-center">
          <Search size={36} className="text-zendo-coral" />
        </div>

        {/* 404 code */}
        <p className="text-8xl md:text-9xl font-extrabold tracking-tighter text-zendo-ink/10 leading-none">
          404
        </p>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zendo-ink">
            Page not found
          </h1>
          <p className="text-base md:text-lg text-zendo-ink-light leading-relaxed">
            We couldn&apos;t find the page you were looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-zendo-coral transition-all hover:bg-zendo-coral/90 hover:gap-3 active:scale-95 rounded-full shadow-lg shadow-zendo-coral/20"
          >
            <Home size={16} />
            Back to home
          </Link>
          <Link
            to="/app/today"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold border-2 border-zendo-ink/15 text-zendo-ink transition-all hover:bg-zendo-ink hover:text-white active:scale-95 rounded-full"
          >
            Go to app
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
