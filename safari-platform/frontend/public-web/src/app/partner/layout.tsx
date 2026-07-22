import type { Metadata } from "next";
import { AuthProvider } from "@safari/auth";

export const metadata: Metadata = {
  title: "Partner portal — Safari Strives",
  description: "Sponsored ventures and impact reports for Safari Strives partners",
};

export default function PartnerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-scope="portal" className="font-sans antialiased">
      <AuthProvider demoMode demoRole="partner">
        {children}
      </AuthProvider>
    </div>
  );
}
