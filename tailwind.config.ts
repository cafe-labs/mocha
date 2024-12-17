/** @type {import('tailwindcss').Config} */
import { themes } from './src/lib/theme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },

  daisyui: {
    themes: themes
  },
  plugins: [require('daisyui')]
}
