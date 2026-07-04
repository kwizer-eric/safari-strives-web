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
import { ApiClient, createApiClient } from "@safari/api-client";
import { storage } from "./storage";

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthSession>;
  logout: () => void;
  api: ApiClient;
  hasRole: (...roles: UserRole[]) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
  backendUrl?: string;
};

export function AuthProvider({ children, backendUrl }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  const api = useMemo(
    () =>
      createApiClient({
        baseUrl: backendUrl,
        getToken: () => session?.token ?? storage.read()?.token ?? null,
      }),
    [backendUrl, session?.token],
  );

  useEffect(() => {
    const existing = storage.read();
    if (existing) setSession(existing);
    setLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await api.auth.login(email, password);
      storage.write(result);
      setSession(result);
      return result;
    },
    [api],
  );

  const logout = useCallback(() => {
    storage.clear();
    setSession(null);
  }, []);

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
      login,
      logout,
      api,
      hasRole,
    }),
    [session, loading, login, logout, api, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
