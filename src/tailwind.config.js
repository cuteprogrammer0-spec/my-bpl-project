/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'digi-purple': '#8B5CF6', 
        'digi-gray': '#6B7280',   
        'digi-dark': '#1F2937'    
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], 
  },
}