import { createFileRoute, Outlet } from "@tanstack/react-router";
import NavBar from "@shared/ui/custom-components/NavBar";
import Footer from "@shared/ui/custom-components/Footer";
import Logo from "@/components/Logo";

function GuestLayout() {
  const navLinks = [{ to: "/pricing", label: "Pricing" }];
  const footerItems = [
    {
      title: "Product",
      items: [
        // { name: "Features", href: "#" },
        { label: "Pricing", to: "/pricing" },
        // { name: "Templates", href: "#" },
        // { name: "Integrations", href: "#" },
        // { name: "API", href: "#" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", to: "#" },
        { label: "Contact", to: "#" },
      ],
    },
  ];
  return (
    <>
      <NavBar navLinks={navLinks} logo={<Logo />} />
      <div className="mt-16 mb-16 w-[90%] sm:w-[80%] md:w-[70%] mx-auto">
        <Outlet />
      </div>
      <Footer
        footerItems={footerItems}
        logo={<Logo />}
        description="The simplest way to create professional invoices and get paid faster."
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
