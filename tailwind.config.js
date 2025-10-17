/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 important for React
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'], // For big, bold titles
        body: ['Montserrat', 'sans-serif'], // For all other text
      },
      fontWeight: {
         // Add 'black' weight if you use it and it's not default
         black: '900',
      }
    },
  },
  plugins: [],
};