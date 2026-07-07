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
  ): Promise<T> {
    const headers = new Headers(init.headers);
    if (init.body && !headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
    const token = this.getToken?.();
    if (token) headers.set("authorization", `Bearer ${token}`);

    const res = await fetch(`${this.baseUrl}${path}`, { ...init, headers });
    const isJson = res.headers
      .get("content-type")
      ?.toLowerCase()
      .includes("application/json");
    const body = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      const message =
        (isJson && typeof body === "object" && body && "message" in body
          ? String((body as { message: unknown }).message)
          : res.statusText) || "Request failed";
      throw new ApiError(res.status, message, body);
    }
    return body as T;
  }

  auth: ApiClientLike["auth"] = {
    login: (email: string, password: string) =>
      this.request<AuthSession>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    me: () => this.request<{ user: User }>("/auth/me"),
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
