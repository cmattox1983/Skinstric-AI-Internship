/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        22: "5.5rem",
      },
      rotate: {
        190: "190deg",
        185: "185deg",
        200: "200deg",
        205: "205deg",
        195: "195deg",
      },
    },
  },
  plugins: [],
};
