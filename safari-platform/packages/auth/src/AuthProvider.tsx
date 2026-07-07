"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthSession, User, UserRole } from "@safari/shared";
import {
  createApiClient,
  getDemoUserByRole,
  type ApiClientLike,
} from "@safari/api-client";
import { storage } from "./storage";

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  demoMode: boolean;
  login: (email: string, password: string) => Promise<AuthSession>;
  logout: () => void;
  api: ApiClientLike;
  hasRole: (...roles: UserRole[]) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
  backendUrl?: string;
  demoMode?: boolean;
  demoRole?: UserRole;
};

export function AuthProvider({
  children,
  backendUrl,
  demoMode = false,
  demoRole,
}: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(() => {
    if (demoMode && demoRole) {
      return { token: "demo-token", user: getDemoUserByRole(demoRole) };
    }
    return null;
  });
  const [loading, setLoading] = useState(!demoMode);

  const api = useMemo<ApiClientLike>(
    () =>
      createApiClient({
        baseUrl: backendUrl,
        demo: demoMode,
        demoRole,
        getToken: () => session?.token ?? storage.read()?.token ?? null,
      }),
    [backendUrl, demoMode, demoRole, session?.token],
  );

  useEffect(() => {
    if (demoMode) return;
    const existing = storage.read();
    if (existing) setSession(existing);
    setLoading(false);
  }, [demoMode]);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await api.auth.login(email, password);
      if (!demoMode) storage.write(result);
      setSession(result);
      return result;
    },
    [api, demoMode],
  );

  const logout = useCallback(() => {
    if (demoMode) {
      if (demoRole) {
        setSession({ token: "demo-token", user: getDemoUserByRole(demoRole) });
      }
      return;
    }
    storage.clear();
    setSession(null);
  }, [demoMode, demoRole]);

  const hasRole = useCallback(
    (...roles: UserRole[]) =>
      session?.user ? roles.includes(session.user.role) : false,
    [session?.user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      loading,
      demoMode,
      login,
      logout,
      api,
      hasRole,
    }),
    [session, loading, demoMode, login, logout, api, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
