import React, { createContext, useContext, useState, useCallback } from "react";
import type { AnyRouter } from "@tanstack/react-router";
import type { User } from "@/lib/types";

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  login: (email: string) => Promise<boolean>;
  signup: (data: {
    firstname: string;
    lastname: string;
    email: string;
    organizationName: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  authenticate: () => Promise<boolean>;
};

const DEMO_USERS_KEY = "oc_demo_users";
const DEMO_SESSION_KEY = "oc_demo_session";

const AuthContext = createContext<AuthState | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
  router: AnyRouter;
};

function generateId() {
  return Math.floor(Math.random() * 1_000_000);
}

function loadDemoUsers(): Record<string, { user: User; password: string }> {
  try {
    const raw = localStorage.getItem(DEMO_USERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, { user: User; password: string }>) : {};
    if (Object.keys(parsed).length === 0) {
      const demo: User = {
        id: 1,
        username: "Demo User",
        email: "demo@opencomms.dev",
        organizationName: "Demo Organisation",
        currentOrgId: 1,
      };
      parsed[demo.email] = { user: demo, password: "password" };
      localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return {};
  }
}

function saveDemoUsers(users: Record<string, { user: User; password: string }>) {
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
}

function getDemoSession(): { user: User } | null {
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY);
    return raw ? (JSON.parse(raw) as { user: User }) : null;
  } catch {
    return null;
  }
}

function setDemoSession(user: User | null) {
  if (user) {
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ user }));
  } else {
    localStorage.removeItem(DEMO_SESSION_KEY);
  }
}

export function AuthProvider({ children, router }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => getDemoSession()?.user ?? null);
  const [accessToken] = useState<string | null>("demo-token");

  const login = useCallback(async (email: string): Promise<boolean> => {
    const users = loadDemoUsers();
    const found = users[email.toLowerCase()];
    if (!found) return false;

    setUser(found.user);
    setDemoSession(found.user);
    return true;
  }, []);

  const signup = useCallback(
    async (data: {
      firstname: string;
      lastname: string;
      email: string;
      organizationName: string;
      password: string;
    }): Promise<boolean> => {
      const users = loadDemoUsers();
      const email = data.email.toLowerCase();
      if (users[email]) return false;

      const newUser: User = {
        id: generateId(),
        username: `${data.firstname} ${data.lastname}`,
        email,
        organizationName: data.organizationName,
        currentOrgId: generateId(),
      };

      users[email] = { user: newUser, password: data.password };
      saveDemoUsers(users);

      setUser(newUser);
      setDemoSession(newUser);
      return true;
    },
    [],
  );

  const logout = useCallback(async () => {
    setUser(null);
    setDemoSession(null);
    await router.navigate({ to: "/login" });
  }, [router]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    const session = getDemoSession();
    if (session) {
      setUser(session.user);
      return true;
    }
    return user !== null;
  }, [user]);

  const value: AuthState = {
    user,
    accessToken,
    login,
    signup,
    logout,
    authenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
