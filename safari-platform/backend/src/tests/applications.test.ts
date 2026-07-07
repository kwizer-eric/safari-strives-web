import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "@/app";
import { resetDatabase } from "@/infrastructure/db";
import { seedDatabase } from "@/infrastructure/seed";

async function tokenFor(email: string) {
  const server = createApp();
  const res = await request(server)
    .post("/auth/login")
    .send({ email, password: "password" });
  return { server, token: res.body.token as string };
}

beforeEach(() => {
  const db = resetDatabase();
  seedDatabase(db);
});

describe("applications", () => {
  it("lists an applicant's own applications", async () => {
    const { server, token } = await tokenFor("applicant@safari.local");
    const res = await request(server)
      .get("/applications/mine")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.applications)).toBe(true);
    expect(res.body.applications.length).toBeGreaterThan(0);
  });

  it("prevents non-admins from listing all applications", async () => {
    const { server, token } = await tokenFor("applicant@safari.local");
    const res = await request(server)
      .get("/applications")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
  });

  it("allows admins to list all applications", async () => {
    const { server, token } = await tokenFor("admin@safari.local");
    const res = await request(server)
      .get("/applications")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.applications.length).toBeGreaterThan(0);
  });

  it("creates and submits an application", async () => {
    const { server, token } = await tokenFor("applicant@safari.local");
    const created = await request(server)
      .post("/applications")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ventureName: "New Venture",
        ventureSummary: "Something meaningful and cool.",
      });

    expect(created.status).toBe(201);
    const id = created.body.application.id as string;

    const submitted = await request(server)
      .post(`/applications/${id}/submit`)
      .set("Authorization", `Bearer ${token}`);

    expect(submitted.status).toBe(200);
    expect(submitted.body.application.status).toBe("submitted");
  });
});
