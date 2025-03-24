/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
    "./assets/**/*.{js,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'impact': ['ImpactLTStd', 'sans-serif'], // Nombre personalizado para tu fuente
      },
    },
  },
  plugins: [],
};


