import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";

function GuestLayout() {
  const navLinks = [{ label: "Pricing", to: "/pricing" }];

  return (
    <div className="bg-void text-white">
      <Navbar navLinks={navLinks} logo={<Logo />} />
      <main>
        <Outlet />
      </main>
      <Footer logo={<Logo />} />
    </div>
  );
}

/*
 * Routes that do not require a user to be authenticated
 */
export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});
