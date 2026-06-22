import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@shared/mobile/storage";

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
      storage: createJSONStorage(() => zustandStorage),
      partialize: (s) => ({ sidebarOpen: s.sidebarOpen, activeProjectId: s.activeProjectId }),
    }
  )
);
