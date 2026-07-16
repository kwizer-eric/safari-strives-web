#!/usr/bin/env node
import { spawn } from "node:child_process";

const commands = [
  { name: "public", args: ["run", "dev", "-w", "public-web"] },
  { name: "admin", args: ["run", "dev", "-w", "admin-dashboard"] },
  { name: "applicant", args: ["run", "dev", "-w", "applicant-portal"] },
  { name: "mentor", args: ["run", "dev", "-w", "mentor-portal"] },
  { name: "partner", args: ["run", "dev", "-w", "partner-portal"] },
];

for (const cmd of commands) {
  const child = spawn("npm", cmd.args, {
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  });
  const prefix = `[${cmd.name}]`;
  const prefixLine = (chunk) =>
    chunk
      .toString()
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => `${prefix} ${line}`)
      .join("\n");
  child.stdout.on("data", (c) => console.log(prefixLine(c)));
  child.stderr.on("data", (c) => console.error(prefixLine(c)));
  child.on("exit", (code) => {
    console.log(`${prefix} exited with ${code}`);
  });
}
