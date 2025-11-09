"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Lazy-load the Figma components on the client
const Sidebar = dynamic(() => import("./components/Sidebar"), { ssr: false });

// Sections
const PremiumScreenerSection   = dynamic(() => import("./components/PremiumScreenerSection"), { ssr: false });
const WatchlistSection         = dynamic(() => import("./components/WatchlistSection"),         { ssr: false });
const SavedAlertsSection       = dynamic(() => import("./components/SavedAlertsSection"),       { ssr: false });
const FiltersSettingsSection   = dynamic(() => import("./components/FiltersSettingsSection"),   { ssr: false });
const TrendingSection          = dynamic(() => import("./components/TrendingSection"),          { ssr: false });
const ToolsSection             = dynamic(() => import("./components/ToolsSection"),             { ssr: false });
const BotSection               = dynamic(() => import("./components/BotSection"),               { ssr: false });
const AccountSection           = dynamic(() => import("./components/AccountSection"),           { ssr: false });
const SubscriptionSection      = dynamic(() => import("./components/SubscriptionSection"),      { ssr: false });

export default function DashboardPage() {
  const [active, setActive] = useState<string>("screener");

  return (
    <div className="min-h-dvh flex" data-theme="dashboard">
      {/* Sidebar (your Figma sidebar uses fixed width ~280px) */}
      <div className="hidden lg:block">
        <Sidebar activeSection={active} onSectionChange={setActive} />
      </div>

      {/* Content area; offset for fixed/floating sidebar on large screens */}
      <div className="flex-1 w-full lg:ml-[280px]">
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
          {active === "screener"      && <PremiumScreenerSection />}
          {active === "watchlist"     && <WatchlistSection />}
          {active === "alerts"        && <SavedAlertsSection />}
          {active === "filters"       && <FiltersSettingsSection />}
          {active === "trending"      && <TrendingSection />}
          {active === "tools"         && <ToolsSection />}
          {active === "bot"           && <BotSection />}
          {active === "account"       && <AccountSection />}
          {active === "subscription"  && <SubscriptionSection />}
        </div>
      </div>
    </div>
  );
}

