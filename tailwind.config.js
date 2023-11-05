/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xss': '0.57rem',
        'sm2': '0.81rem',
      },
      lineHeight: {
        'sm2': '1.07rem',
      },
    },
  },
  plugins: [],
}

