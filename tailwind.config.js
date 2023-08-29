const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@aomdev/ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)"],
      heading: ["var(--font-heading)"]
    },
    extend: {
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)"
          }
        },
        animation: {
          shimmer: "shimmer 2s linear infinite"
        }
      },
      colors: {
        neutral: {
          50: "#f0eefa",
          100: "#d2d0e2",
          200: "#b4b0cc",
          300: "#9591b8",
          400: "#7772a3",
          500: "#5f598a",
          600: "#49446b",
          700: "#34314d",
          800: "#1f1d2f",
          900: "#090914"
        },
        primary: {
          50: "#f1ecff",
          100: "#d4c7ec",
          200: "#b6a4dc",
          300: "#997fcd",
          400: "#7c5abd",
          500: "#6341a4",
          600: "#4d3280",
          700: "#37245c",
          800: "#211539",
          900: "#0d0518"
        },
        secondary: {
          50: "#fff8da",
          100: "#ffebad",
          200: "#ffde7d",
          300: "#ffd04b",
          400: "#ffc31a",
          500: "#e6aa00",
          600: "#b38400",
          700: "#805e00",
          800: "#4e3900",
          900: "#1d1300"
        },
        tertiary: {
          50: "#e9efff",
          100: "#c5cef0",
          200: "#9fade0",
          300: "#7a8cd2",
          400: "#556bc4",
          500: "#3b51aa",
          600: "#2d3f85",
          700: "#1f2d60",
          800: "#111b3c",
          900: "#03091a"
        },
        success: {
          50: "#dbfdff",
          100: "#affffd",
          200: "#80fff6",
          300: "#51ffec",
          400: "#2cfedf",
          500: "#1de5bd",
          600: "#0db38e",
          700: "#008061",
          800: "#004d3f",
          900: "#001c16"
        },
        error: {
          50: "#ffe5e8",
          100: "#fbb8bf",
          200: "#f38b96",
          300: "#ed5f6d",
          400: "#e73344",
          500: "#cd1a2a",
          600: "#a01220",
          700: "#740b17",
          800: "#47050c",
          900: "#1e0002"
        },
        warn: {
          50: "#fff4dd",
          100: "#ffdbb0",
          200: "#ffc07f",
          300: "#ffa14d",
          400: "#fe7f1c",
          500: "#e55d02",
          600: "#b34200",
          700: "#813700",
          800: "#4f2500",
          900: "#200c00"
        },
        gray: {
          50: "#e4f3f6",
          100: "#d0d9e0",
          200: "#b8c1c6",
          300: "#9da8ad",
          400: "#849095",
          500: "#6a777b",
          600: "#525c61",
          700: "#384145",
          800: "#1d262b",
          900: "#020917"
        },
        transparent: colors.transparent,
        black: colors.black,
        white: colors.white
      }
    }
  },
  darkMode: "class"
};
