import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "16px",
          sm: "20px",
          lg: "80px",
        },
      },
      colors: {
        // Semantic tokens — mapped for backward compatibility across components
        "primary-green": "#6366F1", // accent indigo
        "secondary-green": "#4F46E5",
        "accent-green": "#818CF8",
        "green-dark": "#4338CA",
        "primary-blue": "#8B5CF6", // secondary violet
        "secondary-blue": "#7C3AED",
        "accent-blue": "#A78BFA",
        "blue-dark": "#5B21B6",
        cyan: "#A5B4FC",
        "bg-dark": "#09090B",
        "bg-dark-secondary": "#111113",
        "bg-card": "#18181B",
        "bg-cream": "#FAFAFA",
        "bg-light": "#F4F4F5",
        "bg-white-overlay": "rgba(255, 255, 255, 0.04)",
        "text-dark": "#09090B",
        "text-medium": "#71717A",
        "text-light": "#A1A1AA",
        "text-white": "#FAFAFA",
        "text-glow": "#E4E4E7",
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          DEFAULT: "rgba(255, 255, 255, 0.12)",
        },
      },
      backgroundImage: {
        "gradient-futuristic":
          "linear-gradient(180deg, #FAFAFA 0%, #D4D4D8 100%)",
        "gradient-hero":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent)",
        "gradient-card":
          "linear-gradient(180deg, rgba(24, 24, 27, 0.9) 0%, rgba(24, 24, 27, 1) 100%)",
        "gradient-hover": "linear-gradient(180deg, #6366F1 0%, #4F46E5 100%)",
        "gradient-cyber":
          "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 55%)",
        "gradient-neon": "none",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
        "glow-lg":
          "0 0 0 1px rgba(255,255,255,0.08), 0 8px 40px rgba(0,0,0,0.5)",
        "glow-cyan": "0 4px 20px rgba(99, 102, 241, 0.15)",
        hover: "0 12px 40px rgba(0, 0, 0, 0.35)",
        elevated: "0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
