import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { GradientText } from "./utils";
import { Star } from "lucide-react";
import { COLORS } from "./utils";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "We cut our video production time by 80%. Lumina doesn't just generate clips — it generates clips that convert.",
      author: "Maya Chen",
      role: "Head of Content, Pulse Media",
      metric: "3.2x",
      metricLabel: "higher CTR",
    },
    {
      quote:
        "The voiceover quality shocked me. It sounds like we hired a studio for the day, except it took 30 seconds.",
      author: "James Okoro",
      role: "Founder, Reels Agency",
      metric: "50+",
      metricLabel: "videos/week",
    },
    {
      quote: "Finally, an AI video tool that understands short-form pacing. Our hooks have never been sharper.",
      author: "Sofia Martinez",
      role: "Creative Director, Nova",
      metric: "10M+",
      metricLabel: "views generated",
    },
  ];

  return (
    <section className="px-6 py-28 bg-surfacei">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Creator stories</p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Built for <GradientText>results.</GradientText>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-white/5 bg-[#030305]/60 p-1 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed text-white/80">“{t.quote}”</CardDescription>
              </CardHeader>
              <CardContent className="flex items-end justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.amber})` }}
                  >
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.author}</p>
                    <p className="text-xs text-[#8a8a9a]">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-cyan-400">{t.metric}</p>
                  <p className="text-xs text-[#8a8a9a]">{t.metricLabel}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
