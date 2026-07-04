import type { Program } from "@safari/shared";
import { getDatabase } from "@/infrastructure/db";

export function listPrograms(): Program[] {
  return Array.from(getDatabase().programs.values());
}
