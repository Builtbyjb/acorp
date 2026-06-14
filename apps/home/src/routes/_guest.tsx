import { createFileRoute, Outlet } from "@tanstack/react-router";
import NavBar from "@shared/ui/components/Navbar";
import Logo from "@/components/Logo";
import Footer from "@shared/ui/components/Footer";

function GuestLayout() {
  const navLinks = [
    { label: "Products", to: "/products" },
    { label: "Custom", to: "/custom" },
  ];

  const footerItems = [
    {
      title: "Products",
      items: [
        { label: "Invoice", to: "https://invoice.acorp.app" },
        { label: "Zendo", to: "#" },
        { label: "OpenComms", to: "#" },
        { label: "Lumina", to: "#" },
        { label: "Insights", to: "#" },
        { label: "Traqr", to: "#" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "Custom Dev", to: "/custom" },
        { label: "About", to: "#" },
        { label: "Contact", to: "#" },
      ],
    },
  ];

  return (
    <div>
      <NavBar navLinks={navLinks} logo={<Logo />} enableCTA={false} />
      <main className="mt-12 mb-16 w-[90%] sm:w-[80%] md:w-[70%] mx-auto">
        <Outlet />
      </main>
      <Footer
        footerItems={footerItems}
        logo={<Logo />}
        description=" A suite of purposeful tools built for how modern teams actually work."
      />
    </div>
  );
}

/*
 * Routes that do not require a user to be authenticated
 */
export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});
