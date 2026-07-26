import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Safari Strives | Build the conditions. Scale the work.",
  description:
    "Safari Strives provides the space, tools, media capacity, and operator-led support that help local businesses scale in secondary cities like Rubavu.",
};

// CMS pages fetch the API at request time. Without this, `next build` tries to
// prerender them and fails when the backend is not reachable (e.g. Railway).
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className={`${manrope.className} min-h-full flex flex-col antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
