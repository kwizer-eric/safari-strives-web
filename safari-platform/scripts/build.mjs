#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const targets = [
  "@safari/shared",
  "@safari/ui",
  "@safari/api-client",
  "@safari/auth",
  "backend",
  "public-web",
  "admin-dashboard",
  "applicant-portal",
  "mentor-portal",
  "partner-portal",
];

for (const target of targets) {
  console.log(`\n=== build ${target} ===`);
  const result = spawnSync(
    "npm",
    ["run", "build", "--if-present", "-w", target],
    {
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );
  if (result.status !== 0) {
    console.error(`Build failed for ${target}`);
    process.exit(result.status ?? 1);
  }
}
