"use client";

import { useState, type FormEvent } from "react";
import { Alert, Button, Container } from "@safari/ui";
import { getApiBaseUrl } from "@/lib/api-base-url";

export function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) {
      setError("Name and email are required.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setError(null);
    try {
      const res = await fetch(`${getApiBaseUrl()}/submissions/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(detail || `Signup failed (${res.status})`);
      }
      setName("");
      setEmail("");
      setStatus("done");
    } catch (err) {
      setError((err as Error).message || "Signup failed. Try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="relative z-20 border-t border-border bg-cream py-16 md:py-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center md:text-left">
          <h2
            id="newsletter-heading"
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Newsletter
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
            Sign up for field notes from Rubavu.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            noValidate
          >
            <label className="sr-only" htmlFor="newsletter-name">
              Name
            </label>
            <input
              id="newsletter-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "saving"}
              className="w-full flex-1 rounded-full border border-border bg-white px-5 py-3 text-sm text-foreground shadow-sm placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
            />
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "saving"}
              className="w-full flex-1 rounded-full border border-border bg-white px-5 py-3 text-sm text-foreground shadow-sm placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
            />
            <Button
              type="submit"
              disabled={status === "saving"}
              className="shrink-0 sm:px-8"
            >
              {status === "saving" ? "Submitting…" : "Submit"}
            </Button>
          </form>

          {status === "done" && (
            <Alert tone="success" className="mt-4 text-left">
              You&apos;re signed up. Thanks for following along.
            </Alert>
          )}
          {status === "error" && error && (
            <Alert tone="danger" className="mt-4 text-left">
              {error}
            </Alert>
          )}
        </div>
      </Container>
    </section>
  );
}
