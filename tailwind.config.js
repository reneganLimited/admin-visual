/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Roboto: ["'Roboto', sans-serif"],
    },
    extend: {
      colors: {
        "black-soft": "rgba(0, 0, 0, 0.85)",
        "renegan-purple": "#66108E",
        "royal-700": "#19023B",
        "royal-100": "#FDF6B2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
