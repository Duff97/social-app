/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#161215',
        'bg-secondary': '#810081',
        'primary': '#E9E0E4',
        'secondary': '#FFABF3'
      }
    },
  },
  plugins: [],
}

