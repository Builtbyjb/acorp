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
      <div className="flex flex-col h-svh overflow-hidden bg-zendo-cream">
        <TopBar />

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop sidebar */}
          <div
            className={cn(
              "hidden md:block overflow-hidden transition-all duration-300 ease-out flex-shrink-0",
              sidebarOpen ? "w-60 translate-x-0" : "w-0 -translate-x-full"
            )}
          >
            {sidebarOpen && <Sidebar />}
          </div>

          {/* Main content */}
          <main
            className="flex-1 overflow-y-auto relative"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 64px)" }}
          >
            <div className="md:[padding-bottom:0] h-full">
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
