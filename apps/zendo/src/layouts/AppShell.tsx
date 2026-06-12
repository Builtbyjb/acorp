import { Outlet } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopBar } from "@/components/app/TopBar";
import { Sidebar } from "@/components/app/Sidebar";
import { BottomNav } from "@/components/app/BottomNav";
import { MoreSheet } from "@/components/app/MoreSheet";
import { useUIStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";

export function AppShell() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col h-svh bg-background overflow-hidden">
        <TopBar />

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop sidebar */}
          <div
            className={cn(
              "hidden md:block overflow-hidden transition-all duration-200",
              sidebarOpen ? "w-60" : "w-0"
            )}
          >
            {sidebarOpen && <Sidebar />}
          </div>

          {/* Main content */}
          <main
            className={cn(
              "flex-1 overflow-y-auto",
              // bottom padding on mobile to clear the bottom nav
              "pb-0 md:pb-0",
            )}
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 64px)" }}
          >
            <div className="md:[padding-bottom:0]">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Mobile bottom navigation */}
        <BottomNav />
        <MoreSheet />
      </div>
    </TooltipProvider>
  );
}

export default AppShell;
