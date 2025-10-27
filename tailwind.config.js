/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        // Government Professional Color Palette
        'slc-navy': '#1e3a5f',
        'slc-dark': '#2d4563',
        'slc-slate': '#475569',
        'slc-warning': '#dc2626',
        'slc-alert': '#ea8c55',
        'slc-success': '#16a34a',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
