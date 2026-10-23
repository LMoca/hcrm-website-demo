type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const Arrow = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Plus = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Menu = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Check = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const Chevron = ({ className = "h-3.5 w-3.5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/** The logo's rising bars, used as a small brand device. */
export const Bars = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
    <rect x="1" y="13" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.45" />
    <rect x="6" y="10" width="3" height="9" rx="0.5" fill="currentColor" opacity="0.6" />
    <rect x="11" y="6" width="3" height="13" rx="0.5" fill="currentColor" opacity="0.8" />
    <rect x="16" y="1" width="3" height="18" rx="0.5" fill="currentColor" />
  </svg>
);
