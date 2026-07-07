import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Partner portal"
      subtitle="Sign in to review your sponsored ventures and see impact reports."
      allowedRoles={["partner"]}
      redirectTo="/projects"
      defaultEmail="partner@safari.local"
      brandName="Safari Partners"
      brandTagline="Capital that strengthens the business."
      highlights={[
        "See the ventures you're funding.",
        "Read the latest impact reports.",
        "Track portfolio-wide progress.",
      ]}
    />
  );
}
