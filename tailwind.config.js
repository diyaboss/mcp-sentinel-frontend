/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: "#111513",
          800: "#1d2522",
          700: "#202925",
        },
        vermilion: {
          500: "#e53b12",
          600: "#dc3c18",
        },
        offwhite: {
          DEFAULT: "#eee9df",
          muted: "#8b928e",
        }
      },
      fontFamily: {
        display: ['"Oswald"', "Impact", "sans-serif"],
        sans: ['"Inter"', "Helvetica Neue", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        'giant': 'clamp(4rem, 12vw, 12rem)',
        'huge': 'clamp(3rem, 8vw, 8rem)',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
