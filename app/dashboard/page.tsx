import React, { Suspense } from "react"
import DashboardClient from "./components/dashboard-client"

export default function DashboardPage() {
  // Render client logic (uses useSearchParams) inside Suspense
  return (
    <main className="w-full min-h-dvh">
      <div className="mx-auto" style={{ padding: "32px 32px" }}>
        <Suspense fallback={<div className="surface p-6">Loading…</div>}>
          <DashboardClient />
        </Suspense>
      </div>
    </main>
  )
}

