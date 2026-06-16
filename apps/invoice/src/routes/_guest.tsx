import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import NavBar from "@shared/ui/custom-components/Navbar";
import Footer from "@shared/ui/custom-components/Footer";
import Logo from "@/components/Logo";

function GuestLayout() {
  const routerState = useRouterState();
  const isHomePage = routerState.location.pathname === "/";

  const navLinks = [{ to: "/pricing", label: "Pricing" }];
  const footerItems = [
    {
      title: "Product",
      items: [
        { label: "Pricing", to: "/pricing" },
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
      <div className={isHomePage ? "" : "mt-16 mb-16 w-[90%] sm:w-[80%] md:w-[70%] mx-auto"}>
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
