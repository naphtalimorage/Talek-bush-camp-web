/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      }
    },
  },
  plugins: [],
};