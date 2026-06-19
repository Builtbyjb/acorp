import { createFileRoute, Outlet } from "@tanstack/react-router";
import NavBar from "@/components/Navbar";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

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
        { label: "Zendo", to: "https://zendo.acorp.app" },
        { label: "OpenComms", to: "https://opencomms.acorp.app" },
        { label: "Lumina", to: "https://lumina.acorp.app" },
        { label: "Insights", to: "https://insights.acorp.app" },
        { label: "Traqr", to: "https://traqr.acorp.app" },
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
    <>
      <NavBar navLinks={navLinks} logo={<Logo />} />
      <main className="max-w-7xl mx-auto px-8 pt-12 pb-16">
        <Outlet />
      </main>
      <Footer
        footerItems={footerItems}
        logo={<Logo />}
        description=" A suite of purposeful tools built for how modern teams actually work."
      />
    </>
  );
}

/*
 * Routes that do not require a user to be authenticated
 */
export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});
