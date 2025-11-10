import React from "react"
import "./dashboard.css"
import { Sidebar } from "./components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-theme min-h-dvh">
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      </div>
    </div>
  )
}

