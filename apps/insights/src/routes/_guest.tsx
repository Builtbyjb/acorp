import { createFileRoute, Outlet } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

function RouteComponent() {
  return (
    <>
      <Navbar logo={<Logo />} />
      <main className="max-w-7xl mx-auto px-8 pt-16 pb-16">
        <Outlet />
      </main>
      <Footer logo={<Logo />} />
    </>
  );
}

export const Route = createFileRoute("/_guest")({
  component: RouteComponent,
});
