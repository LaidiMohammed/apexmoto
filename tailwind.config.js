/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: { 950: '#0A0A0B', 900: '#111113', 800: '#1A1A1E', 700: '#26262C', 600: '#3A3A42' },
        apex: { DEFAULT: '#E10600', dark: '#A80400', amber: '#FFB800' },
      },
      fontFamily: {
        display: ['Oswald', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { mega: '0.35em' },
    },
  },
  plugins: [],
};
