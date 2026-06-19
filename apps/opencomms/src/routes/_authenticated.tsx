import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
// import Header from "@/components/Header";
import { useAuth } from "@/hooks/auth";
// import { useLayout } from "@/hooks/useLayout";
import { LayoutDashboard, MessageCircle, Users, Megaphone, Settings } from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: <MessageCircle />,
  },
  {
    title: "Contacts",
    url: "/contacts",
    icon: <Users />,
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    icon: <Megaphone />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
];

function AuthLayout() {
  const { user, logout } = useAuth();
  // const { title } = useLayout();

  return (
    <SidebarProvider>
      <Sidebar
        businessname={user?.organizationName}
        username={user?.username}
        email={user?.email}
        navItems={navItems}
        logout={logout}
      />
      <SidebarInset>
        <header className="flex items-center gap-2 ml-4 mt-4">
          <SidebarTrigger className="h-9 w-9 bg-accent hover:bg-accent" size="icon-lg" />
          <Separator orientation="vertical" className="h-6" />
          {/*<Header title={title} />*/}
        </header>
        <div className="mt-8 mx-auto w-[90%]">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
    const isAuthenticated = context.auth ? await context.auth.authenticate() : false;
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: AuthLayout,
});
