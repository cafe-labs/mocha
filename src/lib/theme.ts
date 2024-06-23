import store from 'store2'
import { ThemeData } from './types'

export const themes = {
  themes: ['forest', 'aqua', 'gray', 'dim', 'night', 'bumblebee', 'lemonade', 'luxury', 'sunset']
}

export function handleTheme() {
  const themeData = store('theme') as ThemeData

  if (themeData.theme) document.documentElement.dataset.theme = themeData.theme
}
