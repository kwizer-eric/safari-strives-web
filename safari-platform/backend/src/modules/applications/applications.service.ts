import type { Application } from "@safari/shared";
import { NotFoundError } from "@/common/errors";
import { generateId } from "@/common/id";
import { events } from "@/events/bus";
import { getDatabase } from "@/infrastructure/db";
import type {
  CreateApplicationInput,
  UpdateStatusInput,
} from "./applications.schema";

export function listApplications(): Application[] {
  return Array.from(getDatabase().applications.values());
}

export function listApplicationsForApplicant(
  applicantId: string,
): Application[] {
  return listApplications().filter((a) => a.applicantId === applicantId);
}

export function getApplication(id: string): Application {
  const app = getDatabase().applications.get(id);
  if (!app) throw new NotFoundError("Application not found");
  return app;
}

export async function createApplication(
  applicantId: string,
  input: CreateApplicationInput,
): Promise<Application> {
  const now = new Date().toISOString();
  const app: Application = {
    id: generateId("app"),
    applicantId,
    ventureName: input.ventureName,
    ventureSummary: input.ventureSummary,
    status: "draft",
    submittedAt: null,
    createdAt: now,
  };
  getDatabase().applications.set(app.id, app);
  return app;
}

export async function submitApplication(
  applicantId: string,
  id: string,
): Promise<Application> {
  const app = getApplication(id);
  if (app.applicantId !== applicantId) {
    throw new NotFoundError("Application not found");
  }
  app.status = "submitted";
  app.submittedAt = new Date().toISOString();
  getDatabase().applications.set(app.id, app);
  await events.emit("application.submitted", {
    applicationId: app.id,
    applicantId,
  });
  return app;
}

export async function updateStatus(
  id: string,
  input: UpdateStatusInput,
): Promise<Application> {
  const app = getApplication(id);
  app.status = input.status;
  if (input.status === "submitted" && !app.submittedAt) {
    app.submittedAt = new Date().toISOString();
  }
  getDatabase().applications.set(app.id, app);
  return app;
}
