/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ajuste conforme seu projeto
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4DF4E0", // Azul Turquesa
        secondary: "#2D1A52", // Roxo escuro
        accent: "#FFE348", // Amarelo destaque
        background: "#0E0E2C", // Fundo escuro
        surface: "#1C1C3A", // Cards e containers
        text: "#FFFFFF", // Texto branco
        statusAlive: "#00FF91", // Verde
        statusDead: "#FF4E4E", // Vermelho
        statusUnknown: "#CCCCCC", // Cinza
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        creepster: ["var(--font-creepster)"],
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
