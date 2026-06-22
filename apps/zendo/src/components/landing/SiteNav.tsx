import { Link } from "@tanstack/react-router";
import { DownloadAppButton } from "@/components/landing/DownloadAppButton";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zendo-ink/5 backdrop-blur-xl transition-all duration-200 bg-white/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-zendo-coral to-amber-400 text-white text-sm font-black shadow-lg shadow-zendo-coral/20 transition-transform group-hover:scale-95 group-hover:rotate-[-3deg]">
            Z
          </div>
          <span className="font-bold text-lg tracking-tight text-zendo-ink">Zendo</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <DownloadAppButton className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-zendo-ink transition-all hover:bg-zendo-ink/90 hover:gap-3 active:scale-95 rounded-full shadow-lg shadow-zendo-ink/10">
            Download App
          </DownloadAppButton>
        </div>
      </div>
    </header>
  );
}
