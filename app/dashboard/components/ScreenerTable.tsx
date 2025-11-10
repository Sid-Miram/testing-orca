// app/dashboard/components/ScreenerTable.tsx
import { Bell, Check, X } from "lucide-react";

type Row = {
  name: string;
  sub: string;
  intraday: [number, number]; // [bearish%, bullish%]
  daily: [number, number];
  adv: { score: number; ok: boolean; vol: boolean; alert: boolean };
};

const rows: Row[] = [
  { name: "AAPL",   sub: "Apple Inc.",   intraday: [31, 69], daily: [22, 78], adv: { score: 45, ok: true, vol: true, alert: true } },
  { name: "BTCUSD", sub: "Bitcoin",      intraday: [53, 47], daily: [37, 63], adv: { score: 32, ok: false, vol: true, alert: true } },
  { name: "EURUSD", sub: "Euro/Dollar",  intraday: [42, 58], daily: [48, 52], adv: { score: 18, ok: true, vol: true, alert: false } },
  { name: "TSLA",   sub: "Tesla Inc.",   intraday: [67, 33], daily: [58, 42], adv: { score: 38, ok: false, vol: true, alert: false } },
  { name: "ETHUSD", sub: "Ethereum",     intraday: [28, 72], daily: [35, 65], adv: { score: 41, ok: true, vol: false, alert: true } },
];

function SegBar({ v }: { v: [number, number] }) {
  const [bear, bull] = v;
  return (
    <div className="h-8 rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--bg-elev-2)" }}>
      <div className="h-full flex">
        <div title={`${bear}%`} style={{ width: `${bear}%`, background: "rgba(244, 63, 94, 0.2)" }} />
        <div title={`${bull}%`} style={{ width: `${bull}%`, background: "rgba(34,197,94,0.25)" }} />
      </div>
    </div>
  );
}

export default function ScreenerTable() {
  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="grid grid-cols-[minmax(160px,1fr)_minmax(320px,2fr)_minmax(320px,2fr)_minmax(220px,1fr)] gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
          <div>SYMBOL</div>
          <div>INTRADAY <span className="text-[var(--text-soft)] ml-2">1M | 5M | 15M | 1H</span></div>
          <div>DAILY <span className="text-[var(--text-soft)] ml-2">4H | 1D | 1W</span></div>
          <div>ADVANCED <span className="chip ml-2">ADX | EMA | VOL | ALERTS</span></div>
        </div>
      </div>

      {rows.map((r, i) => (
        <div key={r.name} className="px-5 py-4 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="grid grid-cols-[minmax(160px,1fr)_minmax(320px,2fr)_minmax(320px,2fr)_minmax(220px,1fr)] items-center gap-4">
            {/* Symbol */}
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-xs" style={{ color: "var(--text-soft)" }}>{r.sub}</div>
            </div>

            {/* Intraday */}
            <SegBar v={r.intraday} />

            {/* Daily */}
            <SegBar v={r.daily} />

            {/* Advanced */}
            <div className="flex items-center gap-3 text-sm">
              <div className="chip">{r.adv.score}</div>
              {r.adv.ok ? (
                <Check className="h-4 w-4" color="#22c55e" />
              ) : (
                <X className="h-4 w-4" color="#f43f5e" />
              )}
              <div className="h-2 w-10 rounded-full" style={{ background: r.adv.vol ? "var(--accent-500)" : "var(--border)" }} />
              <Bell className="h-4 w-4" style={{ opacity: r.adv.alert ? 1 : 0.35 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

