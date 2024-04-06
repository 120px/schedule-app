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
      },
      colors: {
        sidebar: "#476A6F",
        sidebarHover: "#A8C4C7",
        createButton: "#519E8A",
        lightYellow: "#FCFDAF",
        mainBackground: "#E4F1EE",
        cardBackground: "#BCDCD3"
        
      }
    },
  },
  plugins: [],
}