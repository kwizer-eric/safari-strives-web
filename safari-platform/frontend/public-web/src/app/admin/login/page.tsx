import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Admin console"
      subtitle="Sign in with your staff account."
      allowedRoles={["admin"]}
      redirectTo="/admin/overview"
      showDemoHint={false}
      variant="minimal"
    />
  );
}
