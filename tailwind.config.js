/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Titillium Web', 'sans-serif'],
      },
      colors: {
        primary: '#0059ba',
        secondary: '#006fe8',
        accent: '#7bd0c2',
        light: '#f2f2f2',
        border: '#c2dfff',
        text: '#31363a',
        muted: '#70777c',
      },
    },
  },
  plugins: [],
}
