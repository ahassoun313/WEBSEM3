/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.html`], // all .html files
  daisyui: {
    themes: [

      "retro"
     
    ],
  },

  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

