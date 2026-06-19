import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});

function GuestLayout() {
  const routerState = useRouterState();
  const isHomePage = routerState.location.pathname === "/";

  const navLinks = [
    { to: "/#features", label: "Features" },
    { to: "/#how-it-works", label: "How it works" },
    { to: "/#pricing", label: "Pricing" },
  ];

  const footerItems = [
    {
      title: "Product",
      items: [
        { label: "Features", to: "/#features" },
        { label: "Pricing", to: "/#pricing" },
        { label: "Security", to: "/" },
        { label: "Log in", to: "/login" },
        { label: "Sign up", to: "/signup" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", to: "/" },
        { label: "Contact", to: "mailto:hello@opencomms.app" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms of Service", to: "/terms" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavBar navLinks={navLinks} logo={<Logo />} />
      <main className={isHomePage ? "flex-1" : "flex-1 mt-16 mb-16 w-[90%] sm:w-[80%] md:w-[70%] mx-auto"}>
        <Outlet />
      </main>
      <Footer
        footerItems={footerItems}
        logo={<Logo />}
        description="Community engagement via SMS & WhatsApp. Built for organisations that put people first."
      />
    </div>
  );
}
