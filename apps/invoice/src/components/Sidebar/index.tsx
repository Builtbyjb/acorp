import * as React from "react";
import {
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Settings,
  User,
  UserPlus,
  Users,
  MessageCircle,
  BarChart3,
  Receipt,
} from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/auth";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "../ui/separator";

type SidebarProps = {
  businessname?: string;
  username?: string;
  email?: string;
};

// Coming-soon badge
function ComingSoonBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ml-auto"
      style={{
        backgroundColor: "#7F8CAA10",
        borderColor: "#7F8CAA28",
        color: "#7F8CAA",
      }}
    >
      <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: "#7F8CAA" }} />
      Soon
    </span>
  );
}

// Beta badge
function BetaBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ml-auto"
      style={{
        backgroundColor: "#4382df0e",
        borderColor: "#4382df2e",
        color: "#4382df",
      }}
    >
      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#4382df" }} />
      Beta
    </span>
  );
}

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: LayoutTemplate,
    badge: <ComingSoonBadge />,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
    badge: <ComingSoonBadge />,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: Receipt,
    badge: <ComingSoonBadge />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "Profile", url: "/settings", icon: User },
      { title: "Billing", url: "/settings/billing", icon: CreditCard },
      { title: "Referral", url: "/settings/referral", icon: UserPlus },
      { title: "Feedback", url: "/settings/feedback", icon: MessageCircle },
    ],
  },
];

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { setOpenMobile } = useSidebar();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (url: string) =>
    currentPath === url || (url !== "/dashboard" && currentPath.startsWith(url));

  return (
    <Sidebar variant="inset" {...props}>
      {/* Header — user/business info */}
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem
            className="mt-3 mb-1 cursor-pointer"
            onClick={() => {
              setOpenMobile(false);
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="flex items-center gap-3 px-2 py-2 rounded-2xl transition-colors hover:bg-white/50">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: "#4382df" }}
              >
                {props.username?.charAt(0).toUpperCase() ?? "A"}
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className="truncate text-sm font-semibold leading-tight"
                  style={{ color: "#0f172a" }}
                >
                  {props.businessname ?? "My Business"}
                </span>
                <span
                  className="truncate text-xs leading-tight"
                  style={{ color: "#7F8CAA" }}
                >
                  {props.email}
                </span>
              </div>
              <BetaBadge />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator className="my-2" style={{ backgroundColor: "#7F8CAA18" }} />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={item.items ? isActive(item.url) : false}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    className="flex gap-3 items-center w-full rounded-2xl px-3 py-2.5 transition-all duration-200 hover:cursor-pointer"
                    style={{
                      backgroundColor: isActive(item.url) ? "#7F8CAA18" : "transparent",
                      color: isActive(item.url) ? "#0f172a" : "#7F8CAA",
                    }}
                    onClick={() => {
                      if (!item.items) {
                        navigate({ to: item.url });
                        setOpenMobile(false);
                      }
                    }}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.badge && item.badge}
                    {item.items && (
                      <ChevronRight
                        className="ml-auto h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 flex-shrink-0"
                        style={{ color: "#7F8CAA" }}
                      />
                    )}
                  </CollapsibleTrigger>

                  {item.items && (
                    <CollapsibleContent>
                      <div className="ml-7 mt-1 flex flex-col gap-0.5">
                        {item.items.map((subItem) => (
                          <button
                            key={subItem.title}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left w-full"
                            style={{
                              backgroundColor: isActive(subItem.url) ? "#7F8CAA14" : "transparent",
                              color: isActive(subItem.url) ? "#0f172a" : "#7F8CAA",
                            }}
                            onClick={() => {
                              setOpenMobile(false);
                              navigate({ to: subItem.url });
                            }}
                          >
                            <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                            {subItem.title}
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}

            {/* Divider before logout */}
            <div className="my-2">
              <Separator style={{ backgroundColor: "#7F8CAA14" }} />
            </div>

            {/* Logout */}
            <SidebarMenuItem>
              <button
                className="flex gap-3 items-center w-full rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:cursor-pointer"
                style={{ color: "#7F8CAA" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#ef4444";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#ef444412";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#7F8CAA";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                Log out
              </button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
