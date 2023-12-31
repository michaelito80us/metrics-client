/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textpri: "#d6dadf",
        textsec: "#97b4b8",
        bgpri: "#2d353e",
        factorial: "#ff365e",
        factorialdark: "#e51943",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
