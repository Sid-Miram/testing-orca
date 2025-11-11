// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import './tokens.css';
import { Navbar } from './components/navbar';

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
