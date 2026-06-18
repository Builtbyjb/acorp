import { ArrowRight, Share2, Type, Image, MousePointerClick } from "lucide-react";
import { GlowOrb, GradientText } from "./utils";
import { COLORS } from "./utils";

const steps = [
  {
    number: "01",
    title: "Describe your idea",
    description: "Type a prompt, paste a URL, or upload a script. Lumina understands context, tone, and intent.",
    icon: Type,
    color: COLORS.cyan,
  },
  {
    number: "02",
    title: "Review the storyboard",
    description: "See every scene before a frame renders. Adjust visuals, pacing, or voice with plain language.",
    icon: Image,
    color: COLORS.violet,
  },
  {
    number: "03",
    title: "Refine in seconds",
    description: "Swap clips, change voice tone, or re-cut the pacing — all with a single instruction.",
    icon: MousePointerClick,
    color: COLORS.amber,
  },
  {
    number: "04",
    title: "Publish anywhere",
    description: "Export or post directly to TikTok, Instagram, and YouTube in one click.",
    icon: Share2,
    color: COLORS.green,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-28">
      <GlowOrb
        className="right-0 top-1/2 h-150 w-150 -translate-y-1/2"
        color={`radial-gradient(circle, ${COLORS.violet}, transparent 70%)`}
        delay="2s"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">The process</p>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Prompt to publish in <GradientText>four steps.</GradientText>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#8a8a9a]">
            No timeline. No templates. Just describe what you want and watch it happen.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 bg-[rgba(3,3,5,0.6)] border-border"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border"
                style={{ backgroundColor: `${step.color}14`, borderColor: `${step.color}30` }}
              >
                <step.icon className="size-6" style={{ color: step.color }} />
              </div>
              <span className="mb-3 block font-black leading-none text-white/6" style={{ fontSize: "4rem" }}>
                {step.number}
              </span>
              <h3 className="mb-3 text-lg font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-foreground">{step.description}</p>

              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border lg:flex bg-surface border-border">
                  <ArrowRight className="size-3 text-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
