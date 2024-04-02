/** @type {import('tailwindcss').Config} */
import config from './src/config'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },

  daisyui: {
    themes: config.themes
  },
  plugins: [require('daisyui')]
}
