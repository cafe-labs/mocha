import store from 'store2'
import { TabData } from '../types'
export function handleTabCloak() {
  const tabData = store('tab') as TabData

  if (tabData.name) {
    document.title = tabData.name
  } else {
    document.title = 'Mocha'
  }

  if (tabData.icon) {
    ;(document.querySelector('link[rel~=icon]') as HTMLLinkElement).href = tabData.icon
  }
}
