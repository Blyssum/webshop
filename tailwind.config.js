/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'rect': '0px 0px 300px 300px #030303',
      },
      minHeight: {
        '1/2': '50%',
      },
      colors: {
        'giroPayBlue': '#000268',
        'almostBlack': '#030303'
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1792px',
      '4xl': '2048px',
    },
  },
  plugins: [],
}