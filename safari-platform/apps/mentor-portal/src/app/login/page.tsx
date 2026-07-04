import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Mentor portal"
      subtitle="Sign in to view your mentees and sessions."
      allowedRoles={["mentor"]}
      redirectTo="/sessions"
      defaultEmail="mentor@safari.local"
    />
  );
}
