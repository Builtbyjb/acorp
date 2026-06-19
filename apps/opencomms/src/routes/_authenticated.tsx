import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth";
import { LayoutDashboard, MessageCircle, Users, Megaphone, Settings } from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: <MessageCircle className="h-4 w-4" />,
  },
  {
    title: "Contacts",
    url: "/contacts",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    icon: <Megaphone className="h-4 w-4" />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

function AuthLayout() {
  const { user, logout } = useAuth();

  return (
    <SidebarProvider>
      <Sidebar
        businessname={user?.organizationName}
        username={user?.username}
        email={user?.email}
        navItems={navItems}
        logout={logout}
      />
      <SidebarInset className="bg-background">
        <header className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <SidebarTrigger className="h-9 w-9" size="icon-lg" />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex-1" />
        </header>
        <div className="p-4 md:p-6 lg:p-8">
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
