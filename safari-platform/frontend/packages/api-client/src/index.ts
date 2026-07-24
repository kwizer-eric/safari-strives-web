import { DEFAULT_BACKEND_URL } from "@safari/shared";
import type {
  Application,
  ApplicationInput,
  ApplicationStatus,
  AuthSession,
  MentorSession,
  PartnerProject,
  Program,
  User,
  UserRole,
} from "@safari/shared";
import { DemoApiClient } from "./demo-client";
import type { ApiClientLike } from "./types";

export type { ApiClientLike } from "./types";
export { DemoApiClient } from "./demo-client";
export { getDemoStore, getDemoUserByRole } from "./demo-store";

export type ApiClientOptions = {
  baseUrl?: string;
  getToken?: () => string | null | undefined;
};

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export class ApiClient implements ApiClientLike {
  private readonly baseUrl: string;
  private readonly getToken?: () => string | null | undefined;

  constructor(opts: ApiClientOptions = {}) {
    this.baseUrl = (opts.baseUrl ?? DEFAULT_BACKEND_URL).replace(/\/$/, "");
    this.getToken = opts.getToken;
  }

  private async request<T>(
    path: string,
    init: RequestInit = {},
    tokenOverride?: string | null,
  ): Promise<T> {
    const headers = new Headers(init.headers);
    if (init.body && !headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
    const token = tokenOverride ?? this.getToken?.();
    if (token) headers.set("authorization", `Bearer ${token}`);

    const res = await fetch(`${this.baseUrl}${path}`, { ...init, headers });
    const isJson = res.headers
      .get("content-type")
      ?.toLowerCase()
      .includes("application/json");
    const body = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      let message = res.statusText || "Request failed";
      if (isJson && typeof body === "object" && body) {
        if ("detail" in body) {
          const detail = (body as { detail: unknown }).detail;
          message =
            typeof detail === "string"
              ? detail
              : Array.isArray(detail)
                ? detail
                    .map((item) =>
                      typeof item === "object" && item && "msg" in item
                        ? String((item as { msg: unknown }).msg)
                        : String(item),
                    )
                    .join(", ")
                : message;
        } else if ("message" in body) {
          message = String((body as { message: unknown }).message);
        }
      }
      throw new ApiError(res.status, message, body);
    }
    return body as T;
  }

  auth: ApiClientLike["auth"] = {
    login: async (email: string, password: string) => {
      // Backend returns OAuth-style { access_token }; map into AuthSession.
      const tokenRes = await this.request<{
        access_token: string;
        token_type: string;
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const me = await this.request<{
        id: number;
        email: string;
        role: string;
        is_active: boolean;
        created_at: string;
      }>("/auth/me", {}, tokenRes.access_token);

      const session: AuthSession = {
        token: tokenRes.access_token,
        user: {
          id: String(me.id),
          name: me.email.split("@")[0] || me.email,
          email: me.email,
          role: (me.role === "admin" ? "admin" : "admin") as User["role"],
          createdAt: me.created_at,
        },
      };
      return session;
    },
    me: async () => {
      const me = await this.request<{
        id: number;
        email: string;
        role: string;
        is_active: boolean;
        created_at: string;
      }>("/auth/me");
      const user: User = {
        id: String(me.id),
        name: me.email.split("@")[0] || me.email,
        email: me.email,
        role: "admin",
        createdAt: me.created_at,
      };
      return { user };
    },
  };

  applications: ApiClientLike["applications"] = {
    listAll: () =>
      this.request<{ applications: Application[] }>("/applications"),
    listMine: () =>
      this.request<{ applications: Application[] }>("/applications/mine"),
    create: (input: ApplicationInput) =>
      this.request<{ application: Application }>("/applications", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    submit: (id: string) =>
      this.request<{ application: Application }>(
        `/applications/${id}/submit`,
        { method: "POST" },
      ),
    updateStatus: (id: string, status: ApplicationStatus) =>
      this.request<{ application: Application }>(
        `/applications/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        },
      ),
  };

  programs: ApiClientLike["programs"] = {
    list: () => this.request<{ programs: Program[] }>("/programs"),
  };

  sessions: ApiClientLike["sessions"] = {
    listMine: () =>
      this.request<{ sessions: MentorSession[] }>("/sessions/mine"),
    listAll: () => this.request<{ sessions: MentorSession[] }>("/sessions"),
  };

  partnerProjects: ApiClientLike["partnerProjects"] = {
    listMine: () =>
      this.request<{ projects: PartnerProject[] }>("/partner-projects/mine"),
    listAll: () =>
      this.request<{ projects: PartnerProject[] }>("/partner-projects"),
  };

  users: ApiClientLike["users"] = {
    list: () => this.request<{ users: User[] }>("/users"),
  };

  donations: ApiClientLike["donations"] = {
    create: (input: {
      name: string;
      email: string;
      amount: number;
      message?: string;
    }) =>
      this.request<{ ok: boolean; message: string }>("/donations", {
        method: "POST",
        body: JSON.stringify(input),
      }),
  };
}

export type CreateApiClientOptions = ApiClientOptions & {
  demo?: boolean;
  demoRole?: UserRole;
};

export function createApiClient(
  options: CreateApiClientOptions = {},
): ApiClientLike {
  if (options.demo) {
    return new DemoApiClient(options.demoRole ?? "admin");
  }
  return new ApiClient(options);
}
