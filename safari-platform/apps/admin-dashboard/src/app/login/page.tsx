import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Safari admin"
      subtitle="Sign in to manage applications, programs, and users."
      allowedRoles={["admin"]}
      redirectTo="/overview"
      defaultEmail="admin@safari.local"
    />
  );
}
