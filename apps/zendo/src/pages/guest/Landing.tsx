import { HeroSection } from "@/components/landing/HeroSection";
import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CtaBanner } from "@/components/landing/CtaBanner";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <SocialProofBar />
      <FeaturesSection />
      <TestimonialsSection />
      {/*<PricingSection />*/}
      <CtaBanner />
    </>
  );
}

export default LandingPage;
