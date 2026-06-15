import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  sidebarOpen: boolean;
  moreSheetOpen: boolean;
  activeProjectId: string | null;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setMoreSheetOpen: (open: boolean) => void;
  setActiveProjectId: (id: string | null) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      moreSheetOpen: false,
      activeProjectId: null,

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setMoreSheetOpen: (open) => set({ moreSheetOpen: open }),
      setActiveProjectId: (id) => set({ activeProjectId: id }),
    }),
    {
      name: "zendo_ui",
      partialize: (s) => ({ sidebarOpen: s.sidebarOpen, activeProjectId: s.activeProjectId }),
    }
  )
);
