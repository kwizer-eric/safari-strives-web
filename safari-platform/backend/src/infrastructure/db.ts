import type {
  Application,
  MentorSession,
  PartnerProject,
  Program,
  User,
} from "@safari/shared";

export type StoredUser = User & { passwordHash: string };

export type Database = {
  users: Map<string, StoredUser>;
  applications: Map<string, Application>;
  programs: Map<string, Program>;
  sessions: Map<string, MentorSession>;
  partnerProjects: Map<string, PartnerProject>;
};

export function createDatabase(): Database {
  return {
    users: new Map(),
    applications: new Map(),
    programs: new Map(),
    sessions: new Map(),
    partnerProjects: new Map(),
  };
}

let singleton: Database | null = null;

export function getDatabase(): Database {
  if (!singleton) {
    singleton = createDatabase();
  }
  return singleton;
}

export function resetDatabase(): Database {
  singleton = createDatabase();
  return singleton;
}
