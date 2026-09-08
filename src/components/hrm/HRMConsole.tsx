import { useState } from "react";
import { motion } from "framer-motion";
import ForecastChart from "@/components/hrm/ForecastChart";
import RiskTable from "@/components/hrm/RiskTable";
import OutcomePanel from "@/components/hrm/OutcomePanel";
import StopLossPanel from "@/components/hrm/StopLossPanel";
import { AS_OF, consoleSummary } from "@/data/hrmDemo";

type TabKey = "forecast" | "members" | "outcomes" | "stoploss";

const tabs: { key: TabKey; label: string; caption: string }[] = [
  { key: "forecast", label: "Forecast", caption: "Group spend, 12 months forward" },
  { key: "members", label: "Members", caption: "Exposure ranked by projected spend" },
  { key: "outcomes", label: "Outcomes", caption: "Programmes measured against baseline" },
  { key: "stoploss", label: "Stop-loss", caption: "Members against your attachment point" },
];

interface HRMConsoleProps {
  /** Hero variant: forecast only, no tab rail, tighter chrome. */
  compact?: boolean;
  className?: string;
}

/**
 * The Health Risk Monitor console. This is the product, rendered honestly
 * rather than mocked up as a screenshot: four real views over one synthetic
 * dataset, so a buyer can read what HRM actually outputs before booking.
 */
const HRMConsole = ({ compact = false, className = "" }: HRMConsoleProps) => {
  const [tab, setTab] = useState<TabKey>("forecast");
  const active = tabs.find((t) => t.key === tab)!;

  return (
    <div className={`plate relative ${className}`}>
      {/* chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
            <span className="label text-ink">Health Risk Monitor</span>
          </span>
          <span className="hidden h-3 w-px bg-line2 sm:block" />
          <span className="hidden font-mono text-[11px] text-dim2 sm:block">
            v4.2 / claims engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-sm bg-mist px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dim2">
            Illustrative data
          </span>
          <span className="font-mono text-[11px] tabular-nums text-dim">
            As of {AS_OF}
          </span>
        </div>
      </div>

      {/* tab rail */}
      {!compact && (
        <div className="flex overflow-x-auto border-b border-line">
          {tabs.map((t) => {
            const isActive = t.key === tab;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                aria-current={isActive ? "true" : undefined}
                className={`relative shrink-0 px-4 py-3.5 text-left transition-colors md:px-6 ${
                  isActive ? "text-ink" : "text-dim hover:text-ink"
                }`}
              >
                <span className="label block">{t.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="hrm-tab-rule"
                    className="absolute inset-x-0 -bottom-px h-[2px] bg-navy"
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* caption */}
      <div className="flex items-baseline justify-between gap-4 px-4 pt-5 md:px-6">
        <p className="text-[13px] text-dim">
          {compact ? "Group spend, 12 months forward" : active.caption}
        </p>
        <span className="hidden font-mono text-[11px] tabular-nums text-dim2 sm:block">
          {consoleSummary.coveredLives.toLocaleString("en-US")} covered lives
        </span>
      </div>

      {/* body */}
      <div className={`px-4 pb-6 pt-4 md:px-6 ${compact ? "" : "md:min-h-[26rem]"}`}>
        {(compact || tab === "forecast") && <ForecastChart compact={compact} />}
        {!compact && tab === "members" && <RiskTable />}
        {!compact && tab === "outcomes" && <OutcomePanel />}
        {!compact && tab === "stoploss" && <StopLossPanel />}
      </div>

      {/* summary rail */}
      <div className="grid grid-cols-3 border-t border-line bg-mist">
        {[
          { k: "Projected spend", v: consoleSummary.projectedSpend, s: "next 12 mo" },
          { k: "Risk exposed", v: consoleSummary.riskExposed, s: "above trend" },
          { k: "Members flagged", v: String(consoleSummary.flagged), s: "actionable now" },
        ].map((cell) => (
          <div key={cell.k} className="px-4 py-4 md:px-6">
            <div className="label text-[9.5px] text-dim2">{cell.k}</div>
            <div className="mt-1.5 font-display text-[19px] font-semibold tabular-nums tracking-[-0.03em] text-ink md:text-[22px]">
              {cell.v}
            </div>
            <div className="mt-0.5 text-[11px] text-dim2">{cell.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRMConsole;
