import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        display: ["Archivo", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        /* --- light palette, derived from the HCRM logo --- */
        canvas: "#FFFFFF",
        mist: "#F4F7FB",
        mist2: "#EAF0F8",

        ink: "#0A1F33",
        ink2: "#10314F",
        dim: "#566B85",
        dim2: "#8496AC",

        line: "#E4EAF3",
        line2: "#CFDAE8",
        lineInk: "#1C3A5A",

        navy: {
          DEFAULT: "#004B87",
          deep: "#00365F",
          soft: "#E6EFF7",
        },
        cyan: {
          DEFAULT: "#00A4E4",
          deep: "#0076A8",
          soft: "#E8F6FD",
        },
        positive: {
          DEFAULT: "#0E9F6E",
          soft: "#E6F6F0",
        },
        danger: {
          DEFAULT: "#DC2626",
          soft: "#FDECEC",
        },

        /* shadcn bridge */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
        lg: "6px",
        xl: "10px",
        "2xl": "16px",
        "3xl": "24px",
      },
      maxWidth: {
        edge: "100rem",
        measure: "38rem",
        "measure-wide": "46rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s cubic-bezier(0.22,1,0.36,1)",
        "accordion-up": "accordion-up 0.22s cubic-bezier(0.22,1,0.36,1)",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
