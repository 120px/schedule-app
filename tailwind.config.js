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
        "primary": "#ff9966",
        "background-light": "#f8f6f5",
        "background-dark": "#23160f",
        "dark-slate": "#1e293b",
        "slate-sidebar": "#181310",
        
        // Keeping some old ones just in case until migration is complete, but updating to match theme where possible
        sidebar: "#181310", // Updated to match slate-sidebar
        sidebarHover: "#2d1e16", // Darker shade for hover
        createButton: "#ff9966", // Updated to primary
        lightYellow: "#FCFDAF",
        mainBackground: "#f8f6f5", // Updated to background-light
        cardBackground: "#FFFFFF" // Updated to white
        
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}