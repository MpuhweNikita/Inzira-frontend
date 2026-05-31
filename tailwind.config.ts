import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3C3489",
          light: "#534AB7",
          accent: "#7F77DD",
        },
        bg: {
          dark: "#0D0C1D",
          light: "#F4F3FF",
        },
        surface: "#FFFFFF",
        text: {
          primary: "#1A1832",
          secondary: "#6B6A8A",
        },
        success: "#1D9E75",
        ai: "#1D9E75",
        warning: "#EF9F27",
        error: "#E24B4A",
        coral: "#D85A30",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
