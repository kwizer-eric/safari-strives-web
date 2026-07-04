import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Applicant portal"
      subtitle="Sign in to submit your venture application."
      allowedRoles={["applicant"]}
      redirectTo="/dashboard"
      defaultEmail="applicant@safari.local"
    />
  );
}
