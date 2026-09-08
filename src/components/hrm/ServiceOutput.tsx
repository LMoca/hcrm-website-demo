import type { ReactNode } from "react";
import ForecastChart from "@/components/hrm/ForecastChart";
import RiskTable from "@/components/hrm/RiskTable";
import OutcomePanel from "@/components/hrm/OutcomePanel";
import StopLossPanel from "@/components/hrm/StopLossPanel";
import NormalizationPanel from "@/components/hrm/NormalizationPanel";
import { AS_OF } from "@/data/hrmDemo";

export type OutputKind =
  | "forecast"
  | "normalization"
  | "outcomes"
  | "members"
  | "stoploss";

const meta: Record<OutputKind, { title: string; caption: string; body: ReactNode }> = {
  forecast: {
    title: "Group spend forecast",
    caption: "24 recorded months, 12 projected, with confidence interval",
    body: <ForecastChart />,
  },
  normalization: {
    title: "Claim normalization",
    caption: "One provider as received, and after validation",
    body: <NormalizationPanel />,
  },
  outcomes: {
    title: "Program outcome assessment",
    caption: "Measured actual against predicted baseline, in dollars",
    body: <OutcomePanel />,
  },
  members: {
    title: "Flagged member queue",
    caption: "Ranked by projected 12-month spend, with cost driver",
    body: <RiskTable />,
  },
  stoploss: {
    title: "Attachment point position",
    caption: "Every member measured against your specific threshold",
    body: <StopLossPanel />,
  },
};

/**
 * The actual HRM output a given service produces, embedded on that service's
 * page. Showing the deliverable beats describing it.
 */
const ServiceOutput = ({ kind }: { kind: OutputKind }) => {
  const m = meta[kind];
  const bare = kind === "normalization";

  if (bare) return <div>{m.body}</div>;

  return (
    <div className="plate">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5 md:px-6">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 bg-navy animate-pulse-dot" />
          <span className="label text-ink">{m.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="border border-line2 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim2">
            Illustrative
          </span>
          <span className="font-mono text-[11px] tabular-nums text-dim">
            As of {AS_OF}
          </span>
        </div>
      </div>
      <p className="px-5 pt-4 text-[13px] text-dim md:px-6">{m.caption}</p>
      <div className="px-5 pb-6 pt-4 md:px-6">{m.body}</div>
    </div>
  );
};

export default ServiceOutput;
