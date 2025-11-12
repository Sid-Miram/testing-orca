// app/layout.tsx
import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/tokens.css";
import { Navbar } from "./_components/navbar";

export const metadata: Metadata = {
  title: "OrcaTrading — Automate, Analyze, Trade Smarter",
  description:
    "OrcaTrading unites automation and market analytics in one transparent ecosystem.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="site">
          {children}
        </div>
      </body>
    </html>
  );
}
