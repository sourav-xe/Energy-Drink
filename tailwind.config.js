/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 important for React
  ],
  theme: {
    extend: {
      // Your existing font and weight config
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'], // For big, bold titles
        body: ['Montserrat', 'sans-serif'], // For all other text
      },
      fontWeight: {
        // Add 'black' weight if you use it and it's not default
        black: '900',
      },

      // ADDED: Animation config for the carousel
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
    },
  },
  plugins: [],
};