import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/hooks/auth";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { useLayout } from "@/hooks/useLayout";

import {
  CreditCard,
  LayoutDashboard,
  LayoutTemplate,
  Settings,
  User,
  UserPlus,
  Users,
  MessageCircle,
  BarChart3,
  FileSpreadsheet,
  // Receipt,
} from "lucide-react";

// Coming-soon badge
function ComingSoonBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold border ml-auto"
      style={{
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.15)",
        color: "rgba(255,255,255,0.60)",
      }}
    >
      <span className="w-1 h-1 animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.60)" }} />
      Soon
    </span>
  );
}

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: <Users />,
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: <FileSpreadsheet />,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: <LayoutTemplate />,
    badge: <ComingSoonBadge />,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: <BarChart3 />,
    badge: <ComingSoonBadge />,
  },
  // {
  //   title: "Expenses",
  //   url: "/expenses",
  //   icon: <Receipt />,
  //   badge: <ComingSoonBadge />,
  // },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
    items: [
      { title: "Profile", url: "/settings", icon: <User /> },
      { title: "Billing", url: "/settings/billing", icon: <CreditCard /> },
      { title: "Referral", url: "/settings/referral", icon: <UserPlus /> },
      { title: "Feedback", url: "/settings/feedback", icon: <MessageCircle /> },
    ],
  },
];

function AuthenticatedLayout() {
  const { user, logout } = useAuth();
  const { title } = useLayout();
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
          <SidebarTrigger className="h-12 w-12 bg-accent" size={"icon-lg"} />
          <Separator orientation="vertical" />
          <Header title={title} />
        </header>
        <div className="mt-8 mx-auto w-[90%]">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

/*
 * Routes that require a user to be authenticated
 */
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
    const isAuthenticated = context.auth ? await context.auth.authenticate() : false;
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});
