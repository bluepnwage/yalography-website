/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)"]
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
      }
    }
  },
  darkMode: "class",
  plugins: []
};
