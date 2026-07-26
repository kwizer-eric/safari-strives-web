import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Admin console"
      subtitle="Sign in with your staff account."
      allowedRoles={["admin"]}
      redirectTo="/admin/overview"
      brandName="Safari Admin"
      brandTagline="Steady work behind the scenes."
      showDemoHint={false}
      highlights={[
        "Publish homepage media and collections.",
        "Manage cohorts and program capacity.",
        "See partners, projects, and impact reports.",
      ]}
    />
  );
}
