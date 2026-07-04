export type UserRole = "admin" | "applicant" | "mentor" | "partner";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

export type AuthSession = {
  token: string;
  user: User;
};

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "accepted"
  | "rejected";

export type Application = {
  id: string;
  applicantId: string;
  ventureName: string;
  ventureSummary: string;
  status: ApplicationStatus;
  submittedAt: string | null;
  createdAt: string;
};

export type Program = {
  id: string;
  title: string;
  summary: string;
  cohort: string;
  seatsTotal: number;
  seatsRemaining: number;
  startsAt: string;
};

export type MentorSession = {
  id: string;
  mentorId: string;
  menteeId: string;
  menteeName: string;
  scheduledAt: string;
  durationMinutes: number;
  status: "upcoming" | "completed" | "cancelled";
};

export type PartnerProject = {
  id: string;
  partnerId: string;
  ventureName: string;
  amountFunded: number;
  reportUrl: string | null;
  updatedAt: string;
};
