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

export type VentureStage =
  | "idea"
  | "pilot"
  | "operating"
  | "growing"
  | "scaling";

export type MonthlyRevenueRange =
  | "under_500k"
  | "500k_2m"
  | "2m_10m"
  | "10m_50m"
  | "over_50m";

export type VentureCategory =
  | "agriculture"
  | "food_beverage"
  | "fashion_textiles"
  | "handcraft_decor"
  | "cosmetics"
  | "clean_energy"
  | "technology"
  | "services"
  | "other";

export type ApplicationInput = {
  ventureName: string;
  ventureSummary: string;
  category?: VentureCategory;
  stage?: VentureStage;
  location?: string;
  yearsOperating?: number;
  monthlyRevenue?: MonthlyRevenueRange;
  teamSize?: number;
  programInterest?: string;
  motivation?: string;
  contactPhone?: string;
};

export type Application = {
  id: string;
  applicantId: string;
  ventureName: string;
  ventureSummary: string;
  category?: VentureCategory;
  stage?: VentureStage;
  location?: string;
  yearsOperating?: number;
  monthlyRevenue?: MonthlyRevenueRange;
  teamSize?: number;
  programInterest?: string;
  motivation?: string;
  contactPhone?: string;
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
