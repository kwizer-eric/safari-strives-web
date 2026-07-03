"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="bg-dark py-16 md:py-24"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="newsletter-heading"
            className="mb-8 text-3xl font-bold text-white md:text-4xl"
          >
            Subscribe to our Newsletter!
          </h2>

          {status === "success" ? (
            <p className="text-lg text-white/80" role="status">
              Thank you for subscribing!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-4 text-sm text-red-400" role="alert">
              Oops! Something went wrong while submitting the form.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
