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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  items?: NavItem[];
};

type SidebarProps = {
  businessname?: string;
  username?: string;
  email?: string;
  navItems: NavItem[];
  logout: () => void;
};

function BetaBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold border border-primary/20 rounded-full bg-primary/10 text-primary ml-auto">
      <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
      Beta
    </span>
  );
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & SidebarProps) {
  const { setOpenMobile } = useSidebar();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (url: string) =>
    currentPath === url || (url !== "/dashboard" && currentPath.startsWith(url));

  return (
    <Sidebar variant="inset" className="border-r border-border/60 bg-sidebar" {...props}>
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem
            className="mt-3 mb-1 cursor-pointer"
            onClick={() => {
              setOpenMobile(false);
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl transition-colors hover:bg-sidebar-accent">
              <div className="w-8 h-8 flex items-center justify-center rounded-xl text-sidebar-primary-foreground text-sm font-bold shrink-0 bg-sidebar-primary">
                {props.username?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate font-semibold leading-tight text-sidebar-foreground">
                  {props.businessname}
                </span>
                <span className="truncate text-xs leading-tight text-sidebar-foreground/70">
                  {props.username}
                </span>
              </div>
            </div>
            <BetaBadge />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator className="my-2 bg-sidebar-border" />

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
                    className={cn(
                      "flex gap-3 items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 hover:cursor-pointer hover:bg-sidebar-accent",
                      isActive(item.url)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70"
                    )}
                    onClick={() => {
                      if (!item.items) {
                        navigate({ to: item.url });
                        setOpenMobile(false);
                      }
                    }}
                  >
                    <span
                      className={cn(
                        "transition-colors",
                        isActive(item.url) ? "text-sidebar-primary" : "text-sidebar-foreground/60"
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.badge && item.badge}
                    {item.items && (
                      <ChevronRight className="ml-auto h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 flex-shrink-0 text-sidebar-foreground/50" />
                    )}
                  </CollapsibleTrigger>

                  {item.items && (
                    <CollapsibleContent>
                      <div className="ml-7 mt-1 flex flex-col gap-0.5">
                        {item.items.map((subItem) => (
                          <button
                            key={subItem.title}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2 text-sm font-medium transition-all duration-200 text-left w-full cursor-pointer rounded-xl hover:bg-sidebar-accent",
                              isActive(subItem.url)
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "text-sidebar-foreground/70"
                            )}
                            onClick={() => {
                              setOpenMobile(false);
                              navigate({ to: subItem.url });
                            }}
                          >
                            <span
                              className={isActive(subItem.url) ? "text-sidebar-primary" : "text-sidebar-foreground/50"}
                            >
                              {subItem.icon}
                            </span>
                            {subItem.title}
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}

            <Separator className="my-2 bg-sidebar-border" />

            {/* Logout */}
            <SidebarMenuItem>
              <button
                className="flex gap-3 items-center w-full px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:cursor-pointer hover:bg-destructive/10 text-destructive rounded-xl"
                onClick={() => props.logout()}
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
