import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  email: string;
  createdAt: string;
}

interface AuthStore {
  user: AuthUser | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      login: (email: string) => {
        const existing = get().user;
        if (existing?.email === email) return; // already logged in
        set({
          user: {
            id: crypto.randomUUID(),
            email,
            createdAt: new Date().toISOString(),
          },
        });
      },

      logout: () => {
        set({ user: null });
      },

      isAuthenticated: () => {
        return get().user !== null;
      },
    }),
    {
      name: "zendo_auth",
    }
  )
);
