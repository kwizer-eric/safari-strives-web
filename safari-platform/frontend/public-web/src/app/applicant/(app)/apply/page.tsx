"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ApplicationInput } from "@safari/shared";
import { PageHeader } from "@safari/ui";
import { useAuth } from "@safari/auth";
import { ApplicationForm } from "@/components/applicant/ApplicationForm";

export default function ApplyPage() {
  const router = useRouter();
  const { api, user } = useAuth();

  async function handleCreate(input: ApplicationInput) {
    await api.applications.create(input);
    router.push("/applicant/dashboard");
  }

  return (
    <div className="mx-auto max-w-4xl">
      <button
        type="button"
        onClick={() => router.push("/applicant/dashboard")}
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to dashboard
      </button>
      <PageHeader
        title="New venture application"
        description="Tell us about your venture. It takes about five minutes — you can save as draft and finish later."
      />
      <ApplicationForm
        founderName={user?.name ?? ""}
        founderEmail={user?.email ?? ""}
        onSubmit={handleCreate}
        onCancel={() => router.push("/applicant/dashboard")}
        submitLabel="Save draft & continue"
      />
    </div>
  );
}
