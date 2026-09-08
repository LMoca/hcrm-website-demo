import Reveal from "@/components/kit/Reveal";

/**
 * The four stages a claim passes through, shown with the artefact each stage
 * actually produces. The point is comprehension: a buyer should understand
 * where the 95% number sits in the chain and why it governs everything after it.
 */

const RawStage = () => (
  <div className="space-y-1 font-mono text-[10.5px] leading-relaxed text-dim2">
    {[
      "ST.LUKES HOSP #2  |  99213 |  E11.9",
      "st lukes hospital |  9921 3|  E119",
      "SAINT LUKE'S      |  99213 |  ---",
      "ST LUKES HOSP     |  99213 |  E11.9",
    ].map((row, i) => (
      <div
        key={i}
        className={`truncate border-l-2 pl-2 ${
          i === 1 || i === 2 ? "border-danger/60 text-danger/70" : "border-line2"
        }`}
      >
        {row}
      </div>
    ))}
    <div className="pt-1 text-[10px] text-danger/70">2 exceptions raised</div>
  </div>
);

const NormalizedStage = () => (
  <div className="space-y-1 font-mono text-[10.5px] leading-relaxed">
    {[
      "ST LUKE'S HOSPITAL | 99213 | E11.9",
      "ST LUKE'S HOSPITAL | 99213 | E11.9",
      "ST LUKE'S HOSPITAL | 99213 | E11.9",
      "ST LUKE'S HOSPITAL | 99213 | E11.9",
    ].map((row, i) => (
      <div key={i} className="truncate border-l-2 border-cyan/50 pl-2 text-dim">
        {row}
      </div>
    ))}
    <div className="pt-1 text-[10px] text-cyan/80">4 of 4 resolved &middot; 95%+ accuracy</div>
  </div>
);

const ForecastStage = () => (
  <div>
    <svg viewBox="0 0 200 62" className="w-full" aria-hidden="true">
      <path
        d="M2 46 L26 41 L50 43 L74 34 L98 30"
        stroke="#004B87"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M98 30 L122 25 L146 18 L170 12 L196 6"
        stroke="#00A4E4"
        strokeWidth="1.8"
        strokeDasharray="4 3.5"
        fill="none"
        strokeLinecap="round"
      />
      <line x1="98" y1="2" x2="98" y2="56" stroke="#0A1F33" strokeOpacity="0.3" strokeDasharray="2 3" />
      <circle cx="98" cy="30" r="2.6" fill="#00A4E4" />
    </svg>
    <div className="mt-1 flex justify-between font-mono text-[10px] text-dim2">
      <span>24 mo recorded</span>
      <span className="text-navy">12 mo projected</span>
    </div>
  </div>
);

const ActStage = () => (
  <div className="space-y-2 font-mono text-[10.5px]">
    <div className="flex items-baseline justify-between border-b border-line pb-1.5">
      <span className="text-dim2">Predicted</span>
      <span className="tabular-nums text-cyan">$3.94M</span>
    </div>
    <div className="flex items-baseline justify-between border-b border-line pb-1.5">
      <span className="text-dim2">Actual</span>
      <span className="tabular-nums text-ink">$3.51M</span>
    </div>
    <div className="flex items-baseline justify-between pt-0.5">
      <span className="text-dim2">Measured</span>
      <span className="tabular-nums text-navy">-$428K</span>
    </div>
  </div>
);

const stages = [
  {
    step: "01",
    title: "Ingest",
    body: "Medical and pharmacy claims from any TPA, carrier or vendor format. No schema demands, no rebuild on your side.",
    art: <RawStage />,
  },
  {
    step: "02",
    title: "Normalize",
    body: "Provider names standardized, code sets reconciled, NDC mapped to GPI, duplicates removed, every claim validated against clinical logic.",
    art: <NormalizedStage />,
  },
  {
    step: "03",
    title: "Forecast",
    body: "24 months of history per member drives a projection of the next 12, at member and group level, with a confidence interval.",
    art: <ForecastStage />,
  },
  {
    step: "04",
    title: "Act & measure",
    body: "Flags route to your care team. Every intervention is compared back against its predicted baseline, in dollars.",
    art: <ActStage />,
  },
];

const Pipeline = () => (
  <div className="grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
    {stages.map((s, i) => (
      <Reveal key={s.step} delay={i * 0.07} className="bg-canvas">
        <div className="group relative flex h-full flex-col p-6 transition-colors duration-500 hover:bg-mist lg:p-8">
          {/* connector node */}
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[11px] tabular-nums text-navy">{s.step}</span>
            <span className="h-px flex-1 bg-line" />
            <span className="h-1.5 w-1.5 shrink-0 bg-line2 transition-colors duration-500 group-hover:bg-navy" />
          </div>

          <h3 className="font-display text-[24px] font-semibold tracking-[-0.035em] text-ink">
            {s.title}
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-dim">{s.body}</p>

          <div className="mt-7 md:mt-auto md:pt-8">
            <div className="border border-line bg-mist p-3.5">{s.art}</div>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);

export default Pipeline;
