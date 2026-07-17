import type { Metadata } from "next";
import { AuthProvider } from "@safari/auth";

export const metadata: Metadata = {
  title: "Applicant portal — Safari Strives",
  description: "Apply and track your Safari Strives applications",
};

export default function ApplicantLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-scope="portal">
      <AuthProvider demoMode demoRole="applicant">
        {children}
      </AuthProvider>
    </div>
  );
}
