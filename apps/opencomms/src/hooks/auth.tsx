import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { AnyRouter } from "@tanstack/react-router";
import type { User } from "@/lib/types";

const storage = {
  getItem: (key: string): string | null => localStorage.getItem(key),
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: (key: string) => localStorage.removeItem(key),
};

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

async function loadDemoUsers(): Promise<Record<string, { user: User; password: string }>> {
  try {
    const raw = storage.getItem(DEMO_USERS_KEY);
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
      storage.setItem(DEMO_USERS_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return {};
  }
}

async function saveDemoUsers(users: Record<string, { user: User; password: string }>) {
  storage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
}

async function getDemoSession(): Promise<{ user: User } | null> {
  try {
    const raw = storage.getItem(DEMO_SESSION_KEY);
    return raw ? (JSON.parse(raw) as { user: User }) : null;
  } catch {
    return null;
  }
}

async function setDemoSession(user: User | null) {
  if (user) {
    storage.setItem(DEMO_SESSION_KEY, JSON.stringify({ user }));
  } else {
    storage.removeItem(DEMO_SESSION_KEY);
  }
}

export function AuthProvider({ children, router }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken] = useState<string | null>("demo-token");

  useEffect(() => {
    getDemoSession().then((session) => {
      if (session) setUser(session.user);
    });
  }, []);

  const login = useCallback(async (email: string): Promise<boolean> => {
    const users = await loadDemoUsers();
    const found = users[email.toLowerCase()];
    if (!found) return false;

    setUser(found.user);
    await setDemoSession(found.user);
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
      const users = await loadDemoUsers();
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
      await saveDemoUsers(users);

      setUser(newUser);
      await setDemoSession(newUser);
      return true;
    },
    [],
  );

  const logout = useCallback(async () => {
    setUser(null);
    await setDemoSession(null);
    await router.navigate({ to: "/login" });
  }, [router]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    const session = await getDemoSession();
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
