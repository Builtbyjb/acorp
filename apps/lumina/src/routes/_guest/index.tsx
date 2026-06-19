import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";
import Showcase from "@/components/landing/Showcase";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/FinalCTA";
import ResultsVisual from "@/components/landing/ResultsVisual";
import LogoStrip from "@/components/landing/LogoStrip";
import VisualPipeline from "@/components/landing/VisualPipeline";
import { FilmGrain } from "@/components/landing/utils";

function RouteComponent() {
  return (
    <div className="space-y-16">
      <FilmGrain />
      <Hero />
      <LogoStrip />
      <VisualPipeline />
      <Features />
      <HowItWorks />
      <Showcase />
      <ResultsVisual />
      <Testimonials />
      <Pricing />
      <FinalCTA />
    </div>
  );
}

export const Route = createFileRoute("/_guest/")({
  component: RouteComponent,
});
