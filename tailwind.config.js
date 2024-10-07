/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '380px',
      },
      boxShadow: {
        'custom-dark': '0px 10px 40px 0px rgb(255 0 0 / 0%), 0 0px 15px -3px rgb(112 105 105 / 100%)',
      },
      colors: {
        dark: {
          background: '#333',
          text: '#fff',
          sidebarDark: '#242a34'
        },
        light: {
          background: '#fff',
          text: '#000',
        },
      },
    },
  },
  plugins: [],
}
