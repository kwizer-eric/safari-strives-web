import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Mentor portal"
      subtitle="Sign in to view your mentees and coaching sessions."
      allowedRoles={["mentor"]}
      redirectTo="/sessions"
      defaultEmail="mentor@safari.local"
      brandName="Safari Mentors"
      brandTagline="Practitioner-led support for real founders."
      highlights={[
        "See upcoming and past sessions.",
        "Track the mentees you're coaching.",
        "Stay aligned with the program team.",
      ]}
    />
  );
}
