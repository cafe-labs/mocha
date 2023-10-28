import config from './src/config'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      config.darkTheme,
      config.lightTheme
    ],
  },
};  