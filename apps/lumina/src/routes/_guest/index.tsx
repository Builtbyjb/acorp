import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/")({
  component: LuminaLanding,
});

// ── Icons ─────────────────────────────────────────────────────────────────────

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: "#ebf0f0e8", borderColor: "#7F8CAA22" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black transition-transform group-hover:scale-95"
            style={{ backgroundColor: "#4382df" }}
          >
            L
          </div>
          <span
            className="font-bold text-lg tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Lumina
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {["Features", "How It Works", "Pricing"].map((link) => (
            <a
              key={link}
              href="#"
              className="px-3 py-1.5 text-sm font-medium rounded-full transition-opacity hover:opacity-60"
              style={{ color: "#7F8CAA" }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:block text-sm font-medium transition-opacity hover:opacity-60"
            style={{ color: "#7F8CAA" }}
          >
            Sign in
          </a>
          <button
            className="group inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-95 active:scale-95"
            style={{
              backgroundColor: "#4382df",
              boxShadow: "0 4px 20px #4382df35",
            }}
          >
            Get started <ArrowRight />
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-20 pb-28"
      style={{ backgroundColor: "#ebf0f0" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Cobalt glow — top right */}
      <div
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df10" }}
      />
      {/* Slate glow — bottom left */}
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#7F8CAA14" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Eyebrow pill */}
        <div
          className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-8"
          style={{
            backgroundColor: "#ffffff70",
            borderColor: "#7F8CAA28",
            color: "#7F8CAA",
            animationDelay: "0.05s",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#4382df" }}
          />
          AI-Powered Short Form Video
        </div>

        {/* Display headline */}
        <h1
          className="animate-fade-up font-extrabold mb-7"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: "0.9",
            color: "#0f172a",
            animationDelay: "0.12s",
            fontWeight: 800,
          }}
        >
          Generate videos.
          <br />
          <span
            style={{
              WebkitTextStroke: "2.5px #4382df",
              color: "transparent",
              display: "block",
            }}
          >
            Stop the scroll.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="animate-fade-up text-lg leading-relaxed max-w-xl mb-10"
          style={{
            color: "#7F8CAA",
            animationDelay: "0.22s",
          }}
        >
          Lumina turns your ideas into scroll-stopping short-form video in
          seconds. No crew, no timeline — just results.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up flex flex-wrap items-center gap-4 mb-14"
          style={{ animationDelay: "0.32s" }}
        >
          <button
            className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-95 active:scale-95"
            style={{
              backgroundColor: "#4382df",
              boxShadow: "0 4px 20px #4382df35",
            }}
          >
            Start creating free <ArrowRight />
          </button>
          <button
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
            style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
          >
            Watch demo
          </button>
        </div>

        {/* Stat chips */}
        <div
          className="animate-fade-up flex flex-wrap gap-3"
          style={{ animationDelay: "0.48s" }}
        >
          {[
            { value: "10M+", label: "videos generated" },
            { value: "< 60s", label: "avg creation time" },
            { value: "30+", label: "style presets" },
          ].map((stat) => (
            <span
              key={stat.value}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: "#ffffff90",
                borderColor: "#7F8CAA25",
                color: "#7F8CAA",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#4382df" }}
              />
              <strong style={{ color: "#0f172a", fontWeight: 700 }}>
                {stat.value}
              </strong>{" "}
              {stat.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────

const features = [
  {
    title: "Script to Screen",
    description:
      "Describe your idea in plain language. Lumina writes the script, picks the visuals, and produces a finished video in one pass.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="#4382df"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="1" width="14" height="16" rx="2" />
        <path d="M5 6h8M5 9h8M5 12h5" />
      </svg>
    ),
  },
  {
    title: "AI Voice & Sound",
    description:
      "Studio-quality narration and background music generated to match your content's tone — no recording booth required.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="#4382df"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 1v16M5 4v10M1 7v4M13 4v10M17 7v4" />
      </svg>
    ),
  },
  {
    title: "Smart Cuts",
    description:
      "Automatic pacing, jump cuts, and transitions tuned for the platform. TikTok rhythm, Reels energy, Shorts clarity.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="#4382df"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="4.5" cy="4.5" r="2.5" />
        <circle cx="4.5" cy="13.5" r="2.5" />
        <path d="M7 4.5h8M7 13.5h3l5-8" />
      </svg>
    ),
  },
  {
    title: "Platform Presets",
    description:
      "Output optimized for TikTok, Instagram Reels, and YouTube Shorts with correct aspect ratios and safe zones applied.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="#4382df"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="1" width="8" height="16" rx="2" />
        <path d="M9 13.5h.01" />
      </svg>
    ),
  },
  {
    title: "Brand Kits",
    description:
      "Upload your logo, set your colors and fonts. Every video stays on-brand without any extra work on your end.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="#4382df"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 14L9 2l7 12H2z" />
        <path d="M5.5 14a3.5 3.5 0 0 0 7 0" />
      </svg>
    ),
  },
  {
    title: "Instant Export",
    description:
      "Download in any resolution or post directly to your platforms. From prompt to published in under a minute.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="#4382df"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 1v11M5 8l4 4 4-4M2 15h14" />
      </svg>
    ),
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-24"
      style={{ backgroundColor: "#ebf0f0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            What Lumina Does
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a", fontWeight: 700 }}
          >
            Everything you need to go viral.
          </h2>
          <p
            className="text-lg max-w-xl leading-relaxed mt-3"
            style={{ color: "#7F8CAA" }}
          >
            From a single prompt to a platform-ready video — the entire
            production stack, automated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                animationDelay: `${0.05 + i * 0.07}s`,
              }}
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  backgroundColor: "#4382df0e",
                  border: "1px solid #4382df2e",
                }}
              >
                {f.icon}
              </div>
              <h3
                className="text-lg font-bold tracking-tight mb-2"
                style={{ color: "#0f172a", fontWeight: 700 }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#7F8CAA" }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Describe your idea",
    description:
      "Type a prompt, paste a URL, or upload a script. Lumina understands context and intent.",
  },
  {
    number: "02",
    title: "Review the storyboard",
    description:
      "See your video broken into scenes before a frame is rendered. Adjust anything in plain language.",
  },
  {
    number: "03",
    title: "Refine in seconds",
    description:
      "Swap clips, change voice tone, adjust pacing — all with natural-language instructions.",
  },
  {
    number: "04",
    title: "Publish anywhere",
    description:
      "Export or post directly to TikTok, Instagram, and YouTube in one click.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24"
      style={{ backgroundColor: "#ebf0f0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            The Process
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a", fontWeight: 700 }}
          >
            Prompt to publish.
          </h2>
          <p
            className="text-lg max-w-xl leading-relaxed mt-3"
            style={{ color: "#7F8CAA" }}
          >
            Four steps. Under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                animationDelay: `${0.08 + i * 0.1}s`,
              }}
            >
              {/* Step number — large faint decoration */}
              <p
                className="font-black mb-5 select-none"
                style={{
                  fontSize: "3.5rem",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "#4382df12",
                  fontWeight: 900,
                }}
              >
                {step.number}
              </p>
              <h3
                className="text-lg font-bold tracking-tight mb-2"
                style={{ color: "#0f172a", fontWeight: 700 }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#7F8CAA" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Examples strip ────────────────────────────────────────────────────────────

const examples = [
  {
    label: "Product Launch",
    style: "Cinematic",
    duration: "0:28",
    gradientTop: "#4382df22",
    gradientBot: "#0f172a35",
    accentBar: "#4382df",
  },
  {
    label: "Tutorial",
    style: "Clean & Bold",
    duration: "0:45",
    gradientTop: "#7F8CAA20",
    gradientBot: "#4382df28",
    accentBar: "#7F8CAA",
  },
  {
    label: "Brand Story",
    style: "Minimal",
    duration: "0:33",
    gradientTop: "#4382df18",
    gradientBot: "#0f172a20",
    accentBar: "#4382df",
  },
  {
    label: "Trending Hook",
    style: "Lo-fi Energy",
    duration: "0:15",
    gradientTop: "#0f172a20",
    gradientBot: "#4382df22",
    accentBar: "#4382df",
  },
];

function ExamplesStrip() {
  return (
    <section className="py-24" style={{ backgroundColor: "#ebf0f0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            Made with Lumina
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a", fontWeight: 700 }}
          >
            Any style. Any format.
          </h2>
          <p
            className="text-lg max-w-xl leading-relaxed mt-3"
            style={{ color: "#7F8CAA" }}
          >
            Browse the style library or describe exactly the look you want.
          </p>
        </div>

        {/* Scrollable row of 9:16 video frames */}
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6">
          {examples.map((ex, i) => (
            <div
              key={ex.label}
              className="animate-fade-up flex-shrink-0 group cursor-pointer"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div
                className="relative rounded-3xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl"
                style={{
                  width: "195px",
                  aspectRatio: "9 / 16",
                  background: `linear-gradient(160deg, ${ex.gradientTop} 0%, ${ex.gradientBot} 100%)`,
                  boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                  backgroundColor: "#dde4e4",
                }}
              >
                {/* Inner dot texture */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #7F8CAA18 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: "#ffffffa0",
                      backdropFilter: "blur(8px)",
                      border: "1px solid #7F8CAA28",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path d="M5 3l9 5-9 5V3z" fill="#0f172a" />
                    </svg>
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "#0f172a80",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {ex.duration}
                  </span>
                </div>

                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 w-full h-0.5"
                  style={{ backgroundColor: ex.accentBar }}
                />

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div
                    className="rounded-2xl px-3 py-2.5"
                    style={{
                      backgroundColor: "#ffffffa0",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <p
                      className="text-xs font-bold tracking-tight leading-none mb-0.5"
                      style={{ color: "#0f172a" }}
                    >
                      {ex.label}
                    </p>
                    <p className="text-xs" style={{ color: "#7F8CAA" }}>
                      {ex.style}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Browse all */}
          <div
            className="animate-fade-up flex-shrink-0"
            style={{ animationDelay: "0.5s" }}
          >
            <div
              className="rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:border-opacity-100"
              style={{
                width: "195px",
                aspectRatio: "9 / 16",
                borderColor: "#7F8CAA30",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: "#7F8CAA14" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#7F8CAA"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v6M5 8h6" />
                </svg>
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: "#7F8CAA" }}
              >
                Browse all
              </p>
              <p
                className="text-xs"
                style={{ color: "#7F8CAA", opacity: 0.6 }}
              >
                30+ styles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Dark CTA ──────────────────────────────────────────────────────────────────

function DarkCTA() {
  return (
    <section className="py-24" style={{ backgroundColor: "#ebf0f0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          {/* Glow layer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
            }}
          />
          {/* Grid layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#4382df" }}
            >
              Get Started Today
            </p>
            <h2
              className="font-extrabold text-white tracking-tight mb-5"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: "1",
                fontWeight: 800,
              }}
            >
              Your first video
              <br />
              <span
                style={{
                  WebkitTextStroke: "2px #4382df",
                  color: "transparent",
                }}
              >
                is on us.
              </span>
            </h2>
            <p
              className="text-base mb-10 max-w-lg mx-auto leading-relaxed"
              style={{ color: "#7F8CAA" }}
            >
              No credit card. No learning curve. Just describe what you want
              and watch Lumina build it in seconds.
            </p>
            <button
              className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-95 active:scale-95"
              style={{
                backgroundColor: "#4382df",
                boxShadow: "0 4px 28px #4382df45",
              }}
            >
              Create your first video <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

const footerLinks: Record<string, string[]> = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

function Footer() {
  return (
    <footer style={{ backgroundColor: "#ebf0f0", borderTop: "1px solid #7F8CAA20" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main row */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between mb-12">
          {/* Brand block */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
                style={{ backgroundColor: "#4382df" }}
              >
                L
              </div>
              <span
                className="font-bold text-lg tracking-tight"
                style={{ color: "#0f172a" }}
              >
                Lumina
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#7F8CAA" }}
            >
              AI-powered video creation for the short-form generation. From
              idea to publish in seconds.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-12 md:gap-16">
            {Object.entries(footerLinks).map(([col, items]) => (
              <div key={col}>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "#0f172a" }}
                >
                  {col}
                </p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm transition-opacity hover:opacity-60"
                        style={{ color: "#7F8CAA" }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #7F8CAA18" }}
        >
          <p className="text-xs" style={{ color: "#7F8CAA" }}>
            © 2026 Lumina. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs transition-opacity hover:opacity-60"
                  style={{ color: "#7F8CAA" }}
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function LuminaLanding() {
  return (
    <div style={{ backgroundColor: "#ebf0f0", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <ExamplesStrip />
      <DarkCTA />
      <Footer />
    </div>
  );
}
