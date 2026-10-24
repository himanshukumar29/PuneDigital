/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./themes/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f5ecd5',
          300: '#eedcad',
          400: '#e4c478',
          500: '#d4af37',
          600: '#b89028',
          700: '#946e20',
          800: '#7a571f',
          900: '#67471d',
        }
      }
    },
  },
  plugins: [],
}
