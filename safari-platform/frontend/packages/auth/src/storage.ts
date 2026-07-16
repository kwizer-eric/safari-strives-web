import { AUTH_COOKIE } from "@safari/shared";
import type { AuthSession } from "@safari/shared";

const isBrowser = typeof window !== "undefined";

export const storage = {
  read(): AuthSession | null {
    if (!isBrowser) return null;
    try {
      const raw = window.localStorage.getItem(AUTH_COOKIE);
      return raw ? (JSON.parse(raw) as AuthSession) : null;
    } catch {
      return null;
    }
  },
  write(session: AuthSession) {
    if (!isBrowser) return;
    window.localStorage.setItem(AUTH_COOKIE, JSON.stringify(session));
  },
  clear() {
    if (!isBrowser) return;
    window.localStorage.removeItem(AUTH_COOKIE);
  },
};
