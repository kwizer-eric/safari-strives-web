import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Admin console"
      subtitle="Sign in to manage applications, programs, users, and partners."
      allowedRoles={["admin"]}
      redirectTo="/admin/overview"
      defaultEmail="admin@safari.local"
      brandName="Safari Admin"
      brandTagline="Steady work behind the scenes."
      highlights={[
        "Move applications through the pipeline.",
        "Manage cohorts and program capacity.",
        "See partners, projects, and impact reports.",
      ]}
    />
  );
}
