import type {
  Application,
  ApplicationInput,
  ApplicationStatus,
  AuthSession,
  User,
  UserRole,
} from "@safari/shared";
import type { ApiClientLike } from "./types";
import {
  findDemoUserByEmail,
  getDemoStore,
  getDemoUserByRole,
} from "./demo-store";

type DemoContext = {
  currentUser: User;
};

function ok<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

function generateId(prefix: string) {
  return `${prefix}_demo_${Math.random().toString(36).slice(2, 10)}`;
}

export class DemoApiClient implements ApiClientLike {
  private ctx: DemoContext;

  constructor(role: UserRole) {
    this.ctx = { currentUser: getDemoUserByRole(role) };
  }

  auth: ApiClientLike["auth"] = {
    login: (email: string, _password: string) => {
      const user = findDemoUserByEmail(email) ?? this.ctx.currentUser;
      this.ctx.currentUser = user;
      const session: AuthSession = { token: "demo-token", user };
      return ok(session);
    },
    me: () => ok({ user: this.ctx.currentUser }),
  };

  applications: ApiClientLike["applications"] = {
    listAll: () => ok({ applications: getDemoStore().applications.slice() }),
    listMine: () =>
      ok({
        applications: getDemoStore().applications.filter(
          (a) => a.applicantId === this.ctx.currentUser.id,
        ),
      }),
    create: (input: ApplicationInput) => {
      const app: Application = {
        id: generateId("app"),
        applicantId: this.ctx.currentUser.id,
        ...input,
        status: "draft",
        submittedAt: null,
        createdAt: new Date().toISOString(),
      };
      getDemoStore().applications.unshift(app);
      return ok({ application: app });
    },
    submit: (id: string) => {
      const store = getDemoStore();
      const app = store.applications.find((a) => a.id === id);
      if (!app) throw new Error("Application not found");
      app.status = "submitted";
      app.submittedAt = new Date().toISOString();
      return ok({ application: app });
    },
    updateStatus: (id: string, status: ApplicationStatus) => {
      const store = getDemoStore();
      const app = store.applications.find((a) => a.id === id);
      if (!app) throw new Error("Application not found");
      app.status = status;
      if (status === "submitted" && !app.submittedAt) {
        app.submittedAt = new Date().toISOString();
      }
      return ok({ application: app });
    },
  };

  programs: ApiClientLike["programs"] = {
    list: () => ok({ programs: getDemoStore().programs.slice() }),
  };

  sessions: ApiClientLike["sessions"] = {
    listMine: () =>
      ok({
        sessions: getDemoStore().sessions.filter(
          (s) => s.mentorId === this.ctx.currentUser.id,
        ),
      }),
    listAll: () => ok({ sessions: getDemoStore().sessions.slice() }),
  };

  partnerProjects: ApiClientLike["partnerProjects"] = {
    listMine: () =>
      ok({
        projects: getDemoStore().partnerProjects.filter(
          (p) => p.partnerId === this.ctx.currentUser.id,
        ),
      }),
    listAll: () => ok({ projects: getDemoStore().partnerProjects.slice() }),
  };

  users: ApiClientLike["users"] = {
    list: () => ok({ users: getDemoStore().users.slice() }),
  };

  donations: ApiClientLike["donations"] = {
    create: () =>
      ok({
        ok: true,
        message: "Demo donation recorded locally.",
      }),
  };
}
