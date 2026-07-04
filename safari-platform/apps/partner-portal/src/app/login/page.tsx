import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Partner portal"
      subtitle="Sign in to review your sponsored projects."
      allowedRoles={["partner"]}
      redirectTo="/projects"
      defaultEmail="partner@safari.local"
    />
  );
}
