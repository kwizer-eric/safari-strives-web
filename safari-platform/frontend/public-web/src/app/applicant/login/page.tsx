import { LoginForm } from "@safari/auth";

export default function LoginPage() {
  return (
    <LoginForm
      title="Applicant portal"
      subtitle="Sign in to submit your venture application and track its progress."
      allowedRoles={["applicant"]}
      redirectTo="/applicant/dashboard"
      defaultEmail="applicant@safari.local"
      brandName="Safari Strives"
      brandTagline="Build the conditions. Scale the work."
      highlights={[
        "Apply to the Venture Accelerator.",
        "Save drafts and finish when you're ready.",
        "See where your application stands.",
      ]}
    />
  );
}
