import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export default function CustomBanner() {
  return (
    <section className="px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8 border"
          style={{
            backgroundColor: "#ffffff80",
            borderColor: "#7F8CAA20",
          }}
        >
          <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase mb-2" style={{ color: "#7F8CAA" }}>
              Custom Development
            </p>
            <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "#0f172a" }}>
              Need something built for you?
            </h3>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: "#7F8CAA" }}>
              We're also open to building fully custom applications — tailored to your exact workflows, brand, and
              goals.
            </p>
          </div>
          <Link to="/custom" className="shrink-0">
            <button
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:gap-3 hover:bg-white active:scale-95 whitespace-nowrap"
              style={{ color: "#4382df", borderColor: "#4382df50" }}
            >
              Learn more
              <ArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
