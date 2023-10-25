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
        "b-shadow":
          "0 7px 3px -4px rgba(179,179,179,0.81), 0 7px 3px -4px rgba(179,179,179,0.81)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
