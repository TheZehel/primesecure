/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bluePrime: "#03a8db", // azul claro
        bluePrime2: "#323d93", // azul escuro
        grayPrime: "#313131",
        greenPromo: "#1eea1e",
        alertRed: "#FF0000",
        pinkPrime: "#f718f7",
        whitePrime: "#f1f1f1",
        pixGreen: "#32BCAD",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        s: "1000px",
        xl: "1800px",
        xl2: "900px",
        xl3: "1500px",
      },

      boxShadow: {
        "uniform-shadow": "0 0 20px rgba(0, 0, 0, 0.1)",
        "petlove-shadow":
          "0px 4px 6px -4px rgba(0,0,0,0.25), 0px 10px 15px -3px rgba(0,0,0,0.1)",
        "card-succesfull-payment":
          "1px 1px 1px 1px rgba(0,0,0,0.25), 0px 5px 8px -2px rgba(0,0,0,0.1)",
      },

      width: {
        "screen-75": "75vw", // 75% da largura da tela
        "screen-90": "90vw", // 90% da largura da tela
        650: "40.625rem", // 650px
        950: "56.25rem",
      },
      height: {
        "screen-90": "90vh", // 90% da altura da tela
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
