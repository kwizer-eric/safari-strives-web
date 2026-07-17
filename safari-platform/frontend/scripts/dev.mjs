#!/usr/bin/env node
import { spawn } from "node:child_process";

const child = spawn("npm", ["run", "dev", "-w", "public-web"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
