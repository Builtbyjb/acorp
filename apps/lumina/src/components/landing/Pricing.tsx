import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlowOrb, GradientText } from "./utils";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    desc: "Try Lumina with no commitment.",
    features: ["5 videos/month", "720p export", "Basic styles", "Lumina watermark"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Creator",
    price: "$19",
    period: "/mo",
    desc: "For solo creators posting daily.",
    features: ["Unlimited videos", "1080p export", "All styles", "No watermark", "Brand kit"],
    cta: "Start creating",
    featured: true,
  },
  {
    name: "Studio",
    price: "$79",
    period: "/mo",
    desc: "For teams and agencies.",
    features: ["Everything in Creator", "4K export", "API access", "Team workspaces", "Priority support"],
    cta: "Contact sales",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-28">
      <GlowOrb
        className="left-1/2 top-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2"
        color={`radial-gradient(circle, rgba(34,211,238,0.12), transparent 60%)`}
        delay="1s"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Pricing</p>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Start free. Scale as you <GradientText>grow.</GradientText>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#8a8a9a]">
            No credit card required to start. Upgrade when you're ready to publish without limits.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden border p-1 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border-cyan-400/30 bg-white/5 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
                  : "border-white/5 bg-white/2 hover:border-white/15"
              }`}
            >
              {plan.featured && (
                <div className="absolute right-0 top-0 rounded-bl-xl rounded-tr-xl bg-linear-to-r from-cyan-400 to-blue-500 px-3 py-1 text-xs font-bold text-[#030305]">
                  Most popular
                </div>
              )}
              <CardHeader className="pt-6">
                <CardTitle className="text-lg font-bold text-white">{plan.name}</CardTitle>
                <CardDescription className="text-sm text-[#8a8a9a]">{plan.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-[#8a8a9a]">{plan.period}</span>}
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#8a8a9a]">
                      <Check className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full font-semibold ${
                    plan.featured
                      ? "bg-linear-to-r from-cyan-400 to-blue-500 text-[#030305] hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                  variant={plan.featured ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
