/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
    "./assets/**/*.{js,html}",
  ],
  theme: {
    extend: {
        backgroundImage: {
        'pieza': "url('./assets/pieza.svg')", // Asegúrate de que las rutas son correctas
      },
      fontFamily: {
        'impact': ['ImpactLTStd', 'sans-serif'], // Nombre personalizado para tu fuente
      },
    },
  },
  plugins: [],
};


