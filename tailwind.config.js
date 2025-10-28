/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        // Government Professional Color Palette (NZ & US inspired)
        "gov-dark": "#003d6e", // Deep navy (NZ Customs)
        "gov-primary": "#005288", // US Blue (CBP)
        "gov-light": "#0db2ad", // Teal accent (NZ)
        "gov-accent": "#c7911b", // Bronze accent
        "gov-alert": "#d32f2f", // Alert red
        "gov-success": "#2e7d32", // Success green
        "gov-bg": "#f5f5f5", // Light gray background
      },
      fontFamily: {
        sans: [
          "Source Sans Pro",
          "Helvetica Neue",
          "Helvetica",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Merriweather",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        gov: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        "gov-lg": "0 10px 25px 0 rgba(0, 0, 0, 0.15)",
      },
      borderColor: {
        "gov-border": "#e0e0e0",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
