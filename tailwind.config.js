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
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        xl: "1800px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
