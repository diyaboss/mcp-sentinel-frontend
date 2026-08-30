/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0D12",
        surface: "#12161D",
        raised: "#171D26",
        line: "#232A35",
        "line-soft": "#1A2028",
        text: {
          primary: "#EAEEF5",
          muted: "#8890A0",
          faint: "#4E5867",
        },
        signal: "#6C7BFF",
        allow: "#3DDC97",
        ask: "#F2B84B",
        block: "#FF5C6C",
        taint: "#B98CFF",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(108,123,255,0.15), 0 0 24px rgba(108,123,255,0.08)",
      },
      keyframes: {
        pulse_travel: {
          "0%": { left: "0%", opacity: "0" },
          "8%": { opacity: "1" },
          "92%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
        flash: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        flash: "flash 1.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
