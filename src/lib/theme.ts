import store from 'store2'
import type { ThemeData } from './types'

// https://daisyui.com/docs/themes
export const themes = ['forest', 'aqua', 'dim', 'night', 'bumblebee', 'lemonade', 'luxury', 'sunset', 'amoled']

export function handleTheme() {
  const themeData = store('theme') as ThemeData

  if (themeData.theme) document.documentElement.dataset.theme = themeData.theme
}
