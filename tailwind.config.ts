import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx,css}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      fontFamily: {
        heading: ["var(--font-rajdhani)", "sans-serif"],
        body: ["var(--font-montserrat)", "sans-serif"]
      },
      colors: {
        background: "#0A0A0A",
        foreground: "#FFFFFF",
        card: "#111111",
        muted: "#2B2B2B",
        border: "rgba(255,255,255,0.1)",
        accent: {
          DEFAULT: "#FFD400",
          foreground: "#0A0A0A"
        }
      },
      boxShadow: {
        neon: "0 0 30px rgba(255, 212, 0, 0.2)",
        glass: "0 12px 40px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        "hero-overlay":
          "radial-gradient(circle at 20% 20%, rgba(255,212,0,0.2), transparent 30%), radial-gradient(circle at 80% 70%, rgba(255,212,0,0.1), transparent 35%), linear-gradient(180deg, rgba(0,0,0,0.4), rgba(10,10,10,0.95))",
        "glass-yellow":
          "linear-gradient(135deg, rgba(255,212,0,0.2), rgba(255,212,0,0.02))"
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 18px rgba(255, 212, 0, 0.2)" },
          "50%": { boxShadow: "0 0 36px rgba(255, 212, 0, 0.35)" }
        },
        drift: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(8px)" }
        }
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
