import store from 'store2'
import { ThemeData } from '../types'
export function handleTheme() {
  const themeData = store('theme') as ThemeData

  if (themeData.theme) document.documentElement.dataset.theme = themeData.theme
}
