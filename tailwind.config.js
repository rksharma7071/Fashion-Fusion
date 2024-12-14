/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mint': '#98FF98',
        'charcoal': '#36454F',
        'copper': '#B87333',
        'ivory': '#FFFFF0',
        'electric': '#00FFFF',
        'neon': '#39FF14',
        'sand': '#C2B280',
        'champagne': '#F7E7CE',
        'gold': '#FFD700',
        'beige': '#F5F5DC',
        'slate': '#2F4F4F'
      }
    },
  },
  plugins: [],
}