import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Capacitor } from "@capacitor/core";
import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";

export const Route = createFileRoute("/_guest/")({
  component: RouteComponent,
});

function NativeLanding() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-6 py-12 bg-white">
      <div className="w-16 h-16 bg-black flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-black text-center mb-3">
        Invoice
      </h1>
      <p className="text-center text-neutral-500 max-w-xs mb-8">
        Create, send, and track professional invoices in under a minute.
      </p>
      <div className="flex flex-col w-full max-w-xs gap-3">
        <button
          className="bg-black text-white rounded-none h-14 text-base font-bold"
          onClick={() => navigate({ to: "/login" })}
        >
          Log in
        </button>
        <button
          className="rounded-none h-14 text-base font-bold border-2 border-black text-black"
          onClick={() => navigate({ to: "/signup" })}
        >
          Sign up
        </button>
      </div>
    </section>
  );
}

function RouteComponent() {
  if (Capacitor.isNativePlatform()) {
    return <NativeLanding />;
  }

  return (
    <>
      <Hero />
      <Logos />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}
