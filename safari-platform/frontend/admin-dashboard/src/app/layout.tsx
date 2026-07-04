import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AuthProvider } from "@safari/auth";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Admin — Safari Strives",
  description: "Safari Strives admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className={`${manrope.className} min-h-full antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
