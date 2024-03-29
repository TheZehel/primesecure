/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bluePrime: "#03a8db",
        bluePrime2: "#323d93",
        grayPrime: "#313131",
        greenPromo: "#1eea1e",
        alertRed: "#FF0000",
        pinkPrime: "#f718f7",
        whitePrime: "#f1f1f1",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        xl: "1800px",
      },
      boxShadow: {
        "uniform-shadow": "0 0 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
