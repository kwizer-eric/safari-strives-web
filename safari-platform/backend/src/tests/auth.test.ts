import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "@/app";
import { resetDatabase } from "@/infrastructure/db";
import { seedDatabase } from "@/infrastructure/seed";

function app() {
  return createApp();
}

beforeEach(() => {
  const db = resetDatabase();
  seedDatabase(db);
});

describe("POST /auth/login", () => {
  it("returns a JWT and user for valid credentials", async () => {
    const res = await request(app())
      .post("/auth/login")
      .send({ email: "admin@safari.local", password: "password" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeTypeOf("string");
    expect(res.body.user).toMatchObject({
      email: "admin@safari.local",
      role: "admin",
    });
  });

  it("rejects wrong password", async () => {
    const res = await request(app())
      .post("/auth/login")
      .send({ email: "admin@safari.local", password: "nope" });

    expect(res.status).toBe(401);
  });

  it("validates payload", async () => {
    const res = await request(app())
      .post("/auth/login")
      .send({ email: "not-an-email" });

    expect(res.status).toBe(400);
  });
});

describe("GET /auth/me", () => {
  it("returns the current user with a valid token", async () => {
    const server = app();
    const login = await request(server)
      .post("/auth/login")
      .send({ email: "mentor@safari.local", password: "password" });

    const res = await request(server)
      .get("/auth/me")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body.user.role).toBe("mentor");
  });

  it("rejects missing tokens", async () => {
    const res = await request(app()).get("/auth/me");
    expect(res.status).toBe(401);
  });
});
