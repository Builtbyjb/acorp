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
} from "../components/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/collapsible";
import { Separator } from "../components/separator";
import { ChevronRight, LogOut } from "lucide-react";
import { ReactNode } from "react";

type NavItem = {
  title: string;
  url: string;
  icon: ReactNode;
  badge?: React.ReactNode;
  items?: NavItem[];
};

type SidebarProps = {
  businessname?: string;
  username?: string;
  email?: string;
  navItems: NavItem[];
};

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

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & SidebarProps) {
  const { setOpenMobile } = useSidebar();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (url: string) => currentPath === url || (url !== "/dashboard" && currentPath.startsWith(url));

  return (
    <Sidebar variant="inset" {...props}>
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
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: "#4382df" }}
              >
                {props.username?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate font-semibold leading-tight text-foreground">{props.businessname}</span>
                <span className="truncate text-sm  leading-tight text-foreground">{props.username}</span>
                <span className="truncate text-sm leading-tight text-muted-foreground">{props.email}</span>
              </div>
            </div>
            <BetaBadge />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator className="my-2 bg-secondary/40" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {props.navItems.map((item) => (
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
                    {item.icon}
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
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left w-full cursor-pointer"
                            style={{
                              backgroundColor: isActive(subItem.url) ? "#7F8CAA14" : "transparent",
                              color: isActive(subItem.url) ? "#0f172a" : "#7F8CAA",
                            }}
                            onClick={() => {
                              setOpenMobile(false);
                              navigate({ to: subItem.url });
                            }}
                          >
                            {subItem.icon}
                            {subItem.title}
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}

            <Separator className="my-2 bg-secondary/40" />

            {/* Logout */}
            <SidebarMenuItem>
              <button
                className="flex gap-3 items-center w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:cursor-pointer bg-[#ef4444]/10 text-[#ef4444]"
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4 shrink-0" />
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
