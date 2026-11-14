/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#080808',
        cardBg: '#151515',
        fireOrange: '#FF6A00',
        electricBlue: '#008CFF',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(255, 106, 0, 0.4)',
        blueNeon: '0 0 20px rgba(0, 140, 255, 0.4)',
      }
    },
  },
  plugins: [],
}
