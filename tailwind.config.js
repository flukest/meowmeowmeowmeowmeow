/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // adjust paths to your project
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // <-- correct syntax
};
