import { Outlet } from "@tanstack/react-router";
import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";

export function GuestLayout() {
  return (
    <div className="flex flex-col min-h-svh bg-zendo-cream">
      <SiteNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export default GuestLayout;
