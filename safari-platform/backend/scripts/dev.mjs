#!/usr/bin/env node
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const venvPython =
  process.platform === "win32"
    ? path.join(backendDir, ".venv", "Scripts", "python.exe")
    : path.join(backendDir, ".venv", "bin", "python");

const pythonCmd = existsSync(venvPython) ? venvPython : "python";
const args = [
  "-m",
  "uvicorn",
  "app.main:app",
  "--reload",
  "--host",
  "0.0.0.0",
  "--port",
  "4000",
];

const child = spawn(pythonCmd, args, {
  cwd: backendDir,
  stdio: "inherit",
  shell: false,
});

child.on("exit", (code) => process.exit(code ?? 1));
