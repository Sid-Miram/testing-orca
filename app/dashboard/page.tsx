// app/dashboard/page.tsx
import Sidebar from "./components/Sidebar";
import ScreenerTable from "./components/ScreenerTable";
import { Download, RefreshCw, ChevronDown, Search } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      {/* Sidebar (real content) */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="min-h-dvh">
        {/* Header */}
        <div className="px-4 md:px-6 lg:px-8 pt-6 pb-4">
          <h1 className="text-2xl md:text-3xl font-semibold">Premium Screener</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-soft)" }}>
            Real-time multi-timeframe trend analysis
          </p>

          {/* Filters row */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button className="btn flex items-center gap-2">
              All Asset Classes <ChevronDown className="h-4 w-4" />
            </button>
            <button className="btn flex items-center gap-2">
              All Trends <ChevronDown className="h-4 w-4" />
            </button>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-soft)" }} />
              <input className="input pl-9 w-[220px]" placeholder="Search symbols..." />
            </div>
            <div className="btn flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Last updated: 2 mins ago
            </div>
            <button className="btn btn-primary flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="px-4 md:px-6 lg:px-8 pb-8">
          <ScreenerTable />
        </div>
      </div>
    </div>
  );
}

