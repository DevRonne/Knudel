import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Navy Blue - exact from van design (darker)
        primary: {
          50: "#e8ecf2",
          100: "#c5cfe0",
          200: "#9eb0cc",
          300: "#7791b8",
          400: "#5a7aa9",
          500: "#3d639a",
          600: "#2d4a75",
          700: "#1e3250",
          800: "#0f1a2b",
          900: "#0a1220",
          950: "#060b14",
        },
        // Orange/Red - flame accent from van design
        accent: {
          50: "#fff4ed",
          100: "#ffe6d5",
          200: "#ffcba8",
          300: "#ffa066",
          400: "#ff7733",
          500: "#ff6600",
          600: "#e65500",
          700: "#cc4400",
          800: "#a33600",
          900: "#7a2900",
        },
        // Water/Cyan - bright splash color from van
        water: {
          50: "#e5f9ff",
          100: "#b3efff",
          200: "#80e5ff",
          300: "#4ddbff",
          400: "#1ad1ff",
          500: "#00b4d8",
          600: "#0099cc",
          700: "#0077b6",
          800: "#005580",
          900: "#003d5c",
        },
        // Flame/Yellow - inner flame glow
        flame: {
          50: "#fffbeb",
          100: "#fff3c4",
          200: "#ffe588",
          300: "#ffd54d",
          400: "#ffcc00",
          500: "#f5b800",
          600: "#cc9900",
          700: "#a37a00",
          800: "#7a5c00",
          900: "#524000",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'diagonal-navy': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
