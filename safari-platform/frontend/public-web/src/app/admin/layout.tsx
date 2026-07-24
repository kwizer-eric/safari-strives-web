import type { Metadata } from "next";
import { AuthProvider } from "@safari/auth";
import { DEFAULT_BACKEND_URL } from "@safari/shared";

export const metadata: Metadata = {
  title: "Admin — Safari Strives",
  description: "Safari Strives admin dashboard",
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? `${DEFAULT_BACKEND_URL}/api/v1`;

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-scope="portal" className="font-sans antialiased">
      {/* Real JWT auth — demoMode would send "demo-token" and fail against /admin/cms. */}
      <AuthProvider backendUrl={API_URL}>{children}</AuthProvider>
    </div>
  );
}
