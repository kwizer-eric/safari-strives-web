import type { Metadata } from "next";
import { AuthProvider } from "@safari/auth";
import { getApiBaseUrl } from "@/lib/api-base-url";

export const metadata: Metadata = {
  title: "Admin — Safari Strives",
  description: "Safari Strives admin dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-scope="portal" className="font-sans antialiased">
      {/* Real JWT auth — demoMode would send "demo-token" and fail against /admin/cms. */}
      <AuthProvider backendUrl={getApiBaseUrl()}>{children}</AuthProvider>
    </div>
  );
}
