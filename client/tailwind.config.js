/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#8B5CF6',
        dark: '#1F2937',
        navy: '#0b1324',
        navyDeep: '#0f1e33',
        cyanAccent: '#22d3ee'
      },
    },
  },
  plugins: [],
}
