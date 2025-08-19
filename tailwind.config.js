/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This line is the key to fixing dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}