"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@safari/shared";
import { Alert, Button, Input } from "@safari/ui";
import { useAuth } from "./AuthProvider";

type LoginFormProps = {
  title: string;
  subtitle?: string;
  allowedRoles: UserRole[];
  redirectTo: string;
  defaultEmail?: string;
};

export function LoginForm({
  title,
  subtitle,
  allowedRoles,
  redirectTo,
  defaultEmail,
}: LoginFormProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [password, setPassword] = useState("password");
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
          `This portal is only for ${allowedRoles.join(", ")}. Your account is a ${result.user.role}.`,
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
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <Alert tone="danger">{error}</Alert>}
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
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
        <Button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        Seeded password for every demo account is{" "}
        <code className="rounded bg-cream px-1.5 py-0.5">password</code>.
      </p>
    </div>
  );
}
