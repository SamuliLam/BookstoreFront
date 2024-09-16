/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-dark': '0px 10px 40px 0px rgb(255 0 0 / 0%), 0 0px 15px -3px rgb(112 105 105 / 100%)',
      },
    },
  },
  plugins: [],
}
