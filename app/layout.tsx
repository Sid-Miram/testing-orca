// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OrcaTrading",
  description: "Automate, analyze, trade smarter.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#0A0F1A]">
      {/* 
        NOTE:
        - overflow-x-hidden on <body> bans horizontal scroll.
        - overflow-x-clip on main isolates any decorative off-screen elements.
      */}
      <body className="min-h-dvh overflow-x-hidden antialiased">
        <main className="relative isolate overflow-x-clip">
          {children}
        </main>
      </body>
    </html>
  );
}

