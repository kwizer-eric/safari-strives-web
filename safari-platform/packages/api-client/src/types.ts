import type {
  Application,
  ApplicationInput,
  ApplicationStatus,
  AuthSession,
  MentorSession,
  PartnerProject,
  Program,
  User,
} from "@safari/shared";

export type ApiClientLike = {
  auth: {
    login(email: string, password: string): Promise<AuthSession>;
    me(): Promise<{ user: User }>;
  };
  applications: {
    listAll(): Promise<{ applications: Application[] }>;
    listMine(): Promise<{ applications: Application[] }>;
    create(input: ApplicationInput): Promise<{ application: Application }>;
    submit(id: string): Promise<{ application: Application }>;
    updateStatus(
      id: string,
      status: ApplicationStatus,
    ): Promise<{ application: Application }>;
  };
  programs: {
    list(): Promise<{ programs: Program[] }>;
  };
  sessions: {
    listMine(): Promise<{ sessions: MentorSession[] }>;
    listAll(): Promise<{ sessions: MentorSession[] }>;
  };
  partnerProjects: {
    listMine(): Promise<{ projects: PartnerProject[] }>;
    listAll(): Promise<{ projects: PartnerProject[] }>;
  };
  users: {
    list(): Promise<{ users: User[] }>;
  };
  donations: {
    create(input: {
      name: string;
      email: string;
      amount: number;
      message?: string;
    }): Promise<{ ok: boolean; message: string }>;
  };
};
