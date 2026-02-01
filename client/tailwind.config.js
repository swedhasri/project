/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo 600
        secondary: '#8B5CF6', // Violet 500
        dark: '#1F2937', // Gray 800
      }
    },
  },
  plugins: [],
}
