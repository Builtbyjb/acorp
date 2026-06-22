import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { AnyRouter } from "@tanstack/react-router";
import type { User, AuthState, AuthResponse } from "@/lib/types";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";
import { useFetch } from "@/hooks/useFetch";
import { isNativePlatform, setRefreshToken, clearRefreshToken, loadRefreshToken } from "@shared/mobile";

const responseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    username: z.string(),
    organizationName: z.string(),
    email: z.string().email(),
  }),
});

const mobileLoginResponseSchema = z.object({
  message: z.string(),
  otpToken: z.string().optional(),
});

const mobileVerifyResponseSchema = responseSchema.extend({
  refreshToken: z.string().optional(),
});

const AuthContext = createContext<AuthState | undefined>(undefined);

let pendingOtpToken: string | null = null;

type AuthProviderProps = {
  children: React.ReactNode;
  router: AnyRouter;
};

export function AuthProvider({ children, router }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { doGET, doPOST } = useFetch();

  useEffect(() => {
    // Warm the secure storage token on native so subsequent fetches can attach it.
    loadRefreshToken().catch(console.error);
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await doGET("/api/v1/auth/logout");
      if (response instanceof Error) throw response;
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      setAccessToken(null);
      await clearRefreshToken();
      await router.navigate({ to: "/login" });
    }
  }, [doGET, router]);

  const isTokenExpired = (accessToken: string): boolean => {
    try {
      const { exp } = jwtDecode(accessToken);

      if (exp === undefined) return true;

      const now = Date.now() / 1000;
      return exp < now;
    } catch {
      // If the token can't be decoded, treat it as expired
      return true;
    }
  };

  const refreshPromiseRef = useRef<Promise<AuthResponse> | null>(null);

  const refreshToken = useCallback(async (): Promise<AuthResponse> => {
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    refreshPromiseRef.current = (async () => {
      try {
        const response = await doGET("/api/v1/auth/refresh-token");
        if (response instanceof Error) throw response;

        if (!response.ok) throw new Error("Failed to refresh token");

        const data: AuthResponse = await response.json();
        const parsed = responseSchema.parse(data);
        setAccessToken(parsed.accessToken);
        setUser(parsed.user);
        return parsed;
      } finally {
        refreshPromiseRef.current = null;
      }
    })();

    return refreshPromiseRef.current;
  }, [doGET]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    try {
      if (!accessToken || isTokenExpired(accessToken)) {
        // Refresh token is no access token or access token as expired
        await refreshToken();
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, [accessToken, refreshToken]);

  const login = useCallback(async (email: string): Promise<boolean> => {
    const response = await doPOST("/api/v1/auth/login", { email });
    if (response instanceof Error) throw response;

    const result = await response.json();
    if (response.ok) {
      if (isNativePlatform()) {
        const parsed = mobileLoginResponseSchema.parse(result);
        if (parsed.otpToken) {
          pendingOtpToken = parsed.otpToken;
        }
      }
      return response.ok;
    }
    throw new Error(result.message);
  }, [doPOST]);

  const verifyOtp = useCallback(async (otp: string): Promise<boolean> => {
    const payload: { otp: string; otpToken?: string } = { otp };
    if (isNativePlatform() && pendingOtpToken) {
      payload.otpToken = pendingOtpToken;
    }

    const response = await doPOST("/api/v1/auth/verify-otp", payload);
    if (response instanceof Error) throw response;

    if (!response.ok) throw new Error("Failed to verify OTP");

    const data = await response.json();
    const parsed = mobileVerifyResponseSchema.parse(data);

    setAccessToken(parsed.accessToken);
    setUser(parsed.user);

    if (isNativePlatform() && parsed.refreshToken) {
      await setRefreshToken(parsed.refreshToken);
      pendingOtpToken = null;
    }

    return response.ok;
  }, [doPOST]);

  const value = useMemo(
    () => ({ accessToken, user, login, logout, refreshToken, verifyOtp, authenticate }),
    [accessToken, user, login, logout, refreshToken, verifyOtp, authenticate]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
