import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AITutor from "@/components/AITutor";
import "./globals.css";

export const metadata: Metadata = {
  title: "DS Quest",
  description: "Gamified learning app for design systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navigation />
        <main className="container" style={{ paddingBottom: '4rem' }}>
          {children}
        </main>
        <AITutor />
      </body>
    </html>
  );
}
