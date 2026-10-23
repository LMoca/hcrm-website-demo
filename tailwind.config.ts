import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["'Instrument Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#F6F4EE",
        paper2: "#EDEAE1",
        white: "#FFFFFF",
        ink: "#0B1B2B",
        ink2: "#3A4A5C",
        dim: "#6A7787",
        rule: "#DAD5C8",
        navy: { DEFAULT: "#0B4A8B", deep: "#06274A", night: "#041A33" },
        cyan: { DEFAULT: "#00A4E4", deep: "#0079AE", soft: "#DDF2FB" },
        signal: { DEFAULT: "#D9532F", soft: "#FBE6DF" },
        sage: { DEFAULT: "#2E8B6A", soft: "#E1F1EA" },
      },
      maxWidth: { page: "78rem", prose: "40rem" },
      letterSpacing: { eyebrow: "0.16em" },
    },
  },
  plugins: [],
} satisfies Config;
