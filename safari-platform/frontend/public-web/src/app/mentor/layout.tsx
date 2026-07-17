import type { Metadata } from "next";
import { AuthProvider } from "@safari/auth";

export const metadata: Metadata = {
  title: "Mentor portal — Safari Strives",
  description: "Coaching hub for Safari Strives mentors",
};

export default function MentorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-scope="portal">
      <AuthProvider demoMode demoRole="mentor">
        {children}
      </AuthProvider>
    </div>
  );
}
