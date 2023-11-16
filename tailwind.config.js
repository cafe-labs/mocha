import config from './src/config'
import daisy from 'daisyui'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [daisy],
  daisyui: {
    themes: [
      config.darkTheme,
      config.lightTheme
    ],
  },
};  