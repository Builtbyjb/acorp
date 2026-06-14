import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/landing/Hero";
import ProductsSection from "@/components/landing/Products";
import CustomBanner from "@/components/landing/CustomBanner";
import CtaSection from "@/components/landing/CTA";

function RouteComponent() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <ProductsSection />
      <CustomBanner />
      <CtaSection />
    </div>
  );
}

export const Route = createFileRoute("/_guest/")({
  component: RouteComponent,
});
