"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ShieldCheck } from "lucide-react";
import type { UserRole } from "@safari/shared";
import { Alert, Button, Input } from "@safari/ui";
import { useAuth } from "./AuthProvider";

type LoginFormProps = {
  title: string;
  subtitle?: string;
  allowedRoles: UserRole[];
  redirectTo: string;
  defaultEmail?: string;
  brandName?: string;
  brandTagline?: string;
  highlights?: string[];
  /** Demo portals can show seeded credentials; real admin login should hide this. */
  showDemoHint?: boolean;
  /** Split = brand sidebar + card; minimal = centered form only. */
  variant?: "split" | "minimal";
};

const defaultHighlights = [
  "Track your progress in one place.",
  "Message mentors and program staff.",
  "See decisions and next steps clearly.",
];

export function LoginForm({
  title,
  subtitle,
  allowedRoles,
  redirectTo,
  defaultEmail,
  brandName = "Safari Strives",
  brandTagline = "Build the conditions. Scale the work.",
  highlights = defaultHighlights,
  showDemoHint = true,
  variant = "split",
}: LoginFormProps) {
  const isMinimal = variant === "minimal";
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await login(email, password);
      if (!allowedRoles.includes(result.user.role)) {
        setError(
          `This portal is for ${allowedRoles.join(", ")} accounts only. You signed in as ${result.user.role}.`,
        );
        setSubmitting(false);
        return;
      }
      router.push(redirectTo);
    } catch (err) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  }

  return (
    <div
      className={
        isMinimal
          ? "min-h-screen w-full"
          : "grid min-h-screen w-full lg:grid-cols-2"
      }
    >
      {!isMinimal ? (
      <aside className="relative hidden overflow-hidden bg-dark p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 15% 10%, rgba(45, 102, 75, 0.55) 0%, transparent 65%), radial-gradient(45% 40% at 90% 90%, rgba(36, 83, 60, 0.5) 0%, transparent 70%), radial-gradient(35% 30% at 80% 15%, rgba(243, 243, 241, 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
        />

        <div className="relative">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {brandName}
          </div>
          <p className="max-w-md text-4xl font-bold leading-[1.1] tracking-tight text-white lg:text-5xl">
            {brandTagline}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            An enterprise hub built with founders in Rubavu. Space, tools,
            media, mentors, and milestone-based capital — in one place.
          </p>
        </div>

        <div className="relative">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            What you get here
          </p>
          <ul className="flex flex-col gap-4 text-sm text-white/90">
            {highlights.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span
                  className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_0_3px_rgba(45,102,75,0.25)]"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-3 border-t border-white/10 pt-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="text-xs text-white/60">
            <p className="font-semibold text-white/90">Secure by default</p>
            <p>Only visible to accounts with the right role.</p>
          </div>
        </div>
      </aside>
      ) : null}

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-4 py-10 sm:px-6 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-accent-hover/10 blur-3xl"
        />

        <div className="relative w-full max-w-md">
          <div
            className={
              isMinimal
                ? ""
                : "overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]"
            }
          >
            {!isMinimal ? (
              <div
                className="h-1.5 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
                }}
              />
            ) : null}
            <div className={isMinimal ? "p-0" : "p-8 sm:p-10"}>
              <div className="mb-8">
                {!isMinimal ? (
                  <div className="mb-3 inline-flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                      Sign in
                    </p>
                  </div>
                ) : null}
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2rem]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {subtitle}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && <Alert tone="danger">{error}</Alert>}
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@safari.local"
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-2 text-sm text-muted">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                      defaultChecked
                    />
                    Keep me signed in
                  </label>
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full py-3 text-base"
                >
                  {submitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </div>

            {showDemoHint ? (
              <div className="border-t border-border bg-cream/60 px-8 py-4 sm:px-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="text-xs">
                    <p className="font-semibold uppercase tracking-widest text-muted">
                      Demo credentials
                    </p>
                    <p className="mt-0.5 text-foreground">
                      Any seeded account works. Password is{" "}
                      <code className="rounded bg-background px-1.5 py-0.5 font-mono text-[11px] font-semibold text-accent-hover">
                        password
                      </code>
                      .
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {!isMinimal ? (
            <p className="mt-6 text-center text-xs text-muted">
              By continuing you agree to the{" "}
              <a
                href="#"
                className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
              >
                terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
              >
                privacy policy
              </a>
              .
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
