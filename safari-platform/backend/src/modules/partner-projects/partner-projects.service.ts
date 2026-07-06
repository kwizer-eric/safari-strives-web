import type { PartnerProject } from "@safari/shared";
import { getDatabase } from "@/infrastructure/db";

export function listPartnerProjects(partnerId: string): PartnerProject[] {
  return Array.from(getDatabase().partnerProjects.values()).filter(
    (p) => p.partnerId === partnerId,
  );
}

export function listAllPartnerProjects(): PartnerProject[] {
  return Array.from(getDatabase().partnerProjects.values());
}
