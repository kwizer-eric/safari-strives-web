import bcrypt from "bcryptjs";
import { generateId } from "@/common/id";
import type { Database } from "@/infrastructure/db";

export function seedDatabase(db: Database) {
  const now = new Date().toISOString();
  const passwordHash = bcrypt.hashSync("password", 8);

  const admin = {
    id: generateId("usr"),
    name: "Ada Admin",
    email: "admin@safari.local",
    role: "admin" as const,
    createdAt: now,
    passwordHash,
  };
  const applicant = {
    id: generateId("usr"),
    name: "Alice Applicant",
    email: "applicant@safari.local",
    role: "applicant" as const,
    createdAt: now,
    passwordHash,
  };
  const mentor = {
    id: generateId("usr"),
    name: "Mo Mentor",
    email: "mentor@safari.local",
    role: "mentor" as const,
    createdAt: now,
    passwordHash,
  };
  const partner = {
    id: generateId("usr"),
    name: "Pat Partner",
    email: "partner@safari.local",
    role: "partner" as const,
    createdAt: now,
    passwordHash,
  };

  [admin, applicant, mentor, partner].forEach((u) => db.users.set(u.id, u));

  const programs = [
    {
      id: generateId("prg"),
      title: "Venture Accelerator",
      summary:
        "Four-month cycle helping operating MSMEs become growth-ready.",
      cohort: "2026 Q3",
      seatsTotal: 8,
      seatsRemaining: 4,
      startsAt: "2026-07-01T00:00:00.000Z",
    },
    {
      id: generateId("prg"),
      title: "Green Enterprise Lab",
      summary: "Poultry and waste-to-value program.",
      cohort: "2026 Q3",
      seatsTotal: 12,
      seatsRemaining: 9,
      startsAt: "2026-08-15T00:00:00.000Z",
    },
    {
      id: generateId("prg"),
      title: "The Hub Residency",
      summary: "Workspace, tools, and media studio residency.",
      cohort: "2026 Q4",
      seatsTotal: 10,
      seatsRemaining: 10,
      startsAt: "2026-10-01T00:00:00.000Z",
    },
  ];
  programs.forEach((p) => db.programs.set(p.id, p));

  const applications = [
    {
      id: generateId("app"),
      applicantId: applicant.id,
      ventureName: "Rubavu Roastery",
      ventureSummary:
        "Specialty coffee roastery sourcing from smallholder farms.",
      status: "submitted" as const,
      submittedAt: now,
      createdAt: now,
    },
    {
      id: generateId("app"),
      applicantId: applicant.id,
      ventureName: "Kivu Textiles (draft)",
      ventureSummary: "Traditional weaving cooperative.",
      status: "draft" as const,
      submittedAt: null,
      createdAt: now,
    },
  ];
  applications.forEach((a) => db.applications.set(a.id, a));

  const sessions = [
    {
      id: generateId("ses"),
      mentorId: mentor.id,
      menteeId: applicant.id,
      menteeName: applicant.name,
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      durationMinutes: 45,
      status: "upcoming" as const,
    },
    {
      id: generateId("ses"),
      mentorId: mentor.id,
      menteeId: applicant.id,
      menteeName: applicant.name,
      scheduledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      durationMinutes: 45,
      status: "completed" as const,
    },
  ];
  sessions.forEach((s) => db.sessions.set(s.id, s));

  const projects = [
    {
      id: generateId("prj"),
      partnerId: partner.id,
      ventureName: "Rubavu Roastery",
      amountFunded: 15000,
      reportUrl: null,
      updatedAt: now,
    },
    {
      id: generateId("prj"),
      partnerId: partner.id,
      ventureName: "Green Enterprise Lab",
      amountFunded: 45000,
      reportUrl: "https://reports.safari.local/gel-q3.pdf",
      updatedAt: now,
    },
  ];
  projects.forEach((p) => db.partnerProjects.set(p.id, p));
}
