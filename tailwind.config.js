/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'auth': '0px 4px 24px rgba(0, 0, 0, 0.1);',
      }
    },
  },
  plugins: [],
}