/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          700: "#1e2433",
          800: "#161b27",
          850: "#131720",
          900: "#0e1219",
          950: "#0a0f1a",
        },
      },
    },
  },
  plugins: [],
}