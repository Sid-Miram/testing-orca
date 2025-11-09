// app/dashboard/layout.tsx
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Keep layout minimal so the Figma Sidebar controls the shell.
  return <>{children}</>;
}

