import type { Metadata } from "next";
import { AuthProvider } from "@safari/auth";

export const metadata: Metadata = {
  title: "Admin — Safari Strives",
  description: "Safari Strives admin dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-scope="portal" className="font-sans antialiased">
      <AuthProvider demoMode demoRole="admin">
        {children}
      </AuthProvider>
    </div>
  );
}
