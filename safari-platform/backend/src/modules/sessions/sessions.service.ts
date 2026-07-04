import type { MentorSession } from "@safari/shared";
import { getDatabase } from "@/infrastructure/db";

export function listSessionsForMentor(mentorId: string): MentorSession[] {
  return Array.from(getDatabase().sessions.values()).filter(
    (s) => s.mentorId === mentorId,
  );
}

export function listAllSessions(): MentorSession[] {
  return Array.from(getDatabase().sessions.values());
}
