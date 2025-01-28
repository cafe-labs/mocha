/** @type {import('tailwindcss').Config} */
import { themes } from './src/lib/theme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },

  daisyui: {
    themes: [
      ...themes,
      {
        amoled: {
          "primary": "#fff",
          "primary-content": "#000",
          "secondary": "#42f5aa",
          "secondary-content": "#111827",
          "accent": "#9d3bff",
          "accent-content": "#eaddff",
          "neutral": "#0a0a0a",
          "neutral-content": "#ffffff",
          "base-100": "#000",
          "base-200": "#0a0a0a",
          "base-300": "#060606",
          "base-content": "#fff",
          "info": "#3b82f6",
          "info-content": "#010615",
          "success": "#6ee7b7",
          "success-content": "#0a0715",
          "warning": "#f43f5e",
          "warning-content": "#fff",
          "error": "#f43f5e",
          "error-content": "#fff",
        },
      },
    ],
  },

  plugins: [require('daisyui')],
};
