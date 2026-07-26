import type {
  Application,
  MentorSession,
  PartnerProject,
  Program,
  User,
  UserRole,
} from "@safari/shared";

export type DemoStore = {
  users: User[];
  applications: Application[];
  programs: Program[];
  sessions: MentorSession[];
  partnerProjects: PartnerProject[];
};

function id(prefix: string, i: number) {
  return `${prefix}_demo_${i}`;
}

const nowIso = new Date().toISOString();
const dayMs = 24 * 60 * 60 * 1000;

const users: User[] = [
  {
    id: id("usr", 1),
    name: "Ada Admin",
    email: "staff@safari.local",
    role: "admin",
    createdAt: nowIso,
  },
  {
    id: id("usr", 2),
    name: "Alice Applicant",
    email: "applicant@safari.local",
    role: "applicant",
    createdAt: nowIso,
  },
  {
    id: id("usr", 3),
    name: "Mo Mentor",
    email: "mentor@safari.local",
    role: "mentor",
    createdAt: nowIso,
  },
  {
    id: id("usr", 4),
    name: "Pat Partner",
    email: "partner@safari.local",
    role: "partner",
    createdAt: nowIso,
  },
  {
    id: id("usr", 5),
    name: "Bob Baker",
    email: "bob@safari.local",
    role: "applicant",
    createdAt: nowIso,
  },
  {
    id: id("usr", 6),
    name: "Rita Reviewer",
    email: "rita@safari.local",
    role: "mentor",
    createdAt: nowIso,
  },
];

const applicantId = users[1]!.id;
const bobId = users[4]!.id;
const mentorId = users[2]!.id;
const partnerId = users[3]!.id;

const applications: Application[] = [
  {
    id: id("app", 1),
    applicantId,
    ventureName: "Rubavu Roastery",
    ventureSummary:
      "Specialty coffee roastery sourcing from smallholder farms around Lake Kivu.",
    status: "submitted",
    submittedAt: nowIso,
    createdAt: nowIso,
  },
  {
    id: id("app", 2),
    applicantId,
    ventureName: "Kivu Textiles",
    ventureSummary:
      "Traditional weaving cooperative producing modern homeware for export.",
    status: "draft",
    submittedAt: null,
    createdAt: nowIso,
  },
  {
    id: id("app", 3),
    applicantId: bobId,
    ventureName: "Sunbake Sourdough",
    ventureSummary:
      "Neighbourhood bakery expanding into wholesale bread supply.",
    status: "in_review",
    submittedAt: new Date(Date.now() - 3 * dayMs).toISOString(),
    createdAt: new Date(Date.now() - 10 * dayMs).toISOString(),
  },
  {
    id: id("app", 4),
    applicantId: bobId,
    ventureName: "GreenGrid Solar",
    ventureSummary:
      "Off-grid solar rentals for small shops in secondary cities.",
    status: "accepted",
    submittedAt: new Date(Date.now() - 14 * dayMs).toISOString(),
    createdAt: new Date(Date.now() - 30 * dayMs).toISOString(),
  },
];

const programs: Program[] = [
  {
    id: id("prg", 1),
    title: "Venture Accelerator",
    summary:
      "Four-month cycle helping operating MSMEs become growth-ready.",
    cohort: "2026 Q3",
    seatsTotal: 8,
    seatsRemaining: 4,
    startsAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: id("prg", 2),
    title: "Green Enterprise Lab",
    summary: "Poultry and waste-to-value residency and demo enterprise.",
    cohort: "2026 Q3",
    seatsTotal: 12,
    seatsRemaining: 9,
    startsAt: "2026-08-15T00:00:00.000Z",
  },
  {
    id: id("prg", 3),
    title: "The Hub Residency",
    summary: "Workspace, tools, and media studio residency.",
    cohort: "2026 Q4",
    seatsTotal: 10,
    seatsRemaining: 10,
    startsAt: "2026-10-01T00:00:00.000Z",
  },
];

const sessions: MentorSession[] = [
  {
    id: id("ses", 1),
    mentorId,
    menteeId: applicantId,
    menteeName: "Alice Applicant",
    scheduledAt: new Date(Date.now() + 1 * dayMs).toISOString(),
    durationMinutes: 45,
    status: "upcoming",
  },
  {
    id: id("ses", 2),
    mentorId,
    menteeId: bobId,
    menteeName: "Bob Baker",
    scheduledAt: new Date(Date.now() + 3 * dayMs).toISOString(),
    durationMinutes: 30,
    status: "upcoming",
  },
  {
    id: id("ses", 3),
    mentorId,
    menteeId: applicantId,
    menteeName: "Alice Applicant",
    scheduledAt: new Date(Date.now() - 4 * dayMs).toISOString(),
    durationMinutes: 45,
    status: "completed",
  },
];

const partnerProjects: PartnerProject[] = [
  {
    id: id("prj", 1),
    partnerId,
    ventureName: "Rubavu Roastery",
    amountFunded: 15000,
    reportUrl: null,
    updatedAt: nowIso,
  },
  {
    id: id("prj", 2),
    partnerId,
    ventureName: "Green Enterprise Lab",
    amountFunded: 45000,
    reportUrl: "https://reports.safari.local/gel-q3.pdf",
    updatedAt: nowIso,
  },
  {
    id: id("prj", 3),
    partnerId,
    ventureName: "GreenGrid Solar",
    amountFunded: 8000,
    reportUrl: null,
    updatedAt: nowIso,
  },
];

const store: DemoStore = {
  users,
  applications,
  programs,
  sessions,
  partnerProjects,
};

export function getDemoStore(): DemoStore {
  return store;
}

export function getDemoUserByRole(role: UserRole): User {
  const found = store.users.find((u) => u.role === role);
  if (!found) {
    throw new Error(`No demo user for role "${role}"`);
  }
  return found;
}

export function findDemoUserByEmail(email: string): User | undefined {
  return store.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
}
