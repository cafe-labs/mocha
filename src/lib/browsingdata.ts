import { openDB } from 'idb'
import { BrowsingData } from './types'

export async function exportData() {
  const data: BrowsingData = {
    cookies: [],
    localStorage: []
  }

  // Local storage
  for (var key in localStorage) {
    if (key.startsWith('__uv$')) {
      const value = localStorage.getItem(key)!

      data.localStorage?.push({
        key,
        value
      })
    }
  }

  // Cookies
  const db = await openDB('__op', 1, {
    upgrade(db) {
      const store = db.createObjectStore('cookies', {
        keyPath: 'id'
      })
      store.createIndex('path', 'path')
    }
  })

  const cookies = await db.getAll('cookies')
  data.cookies = cookies

  const link = document.createElement('a')

  const file = new Blob([JSON.stringify(data)], { type: 'text/plain' })

  link.href = URL.createObjectURL(file)

  link.download = `mocha-export-${Date.now()}.json`

  link.click()
  URL.revokeObjectURL(link.href)

  link.remove()
}

export function importData() {}

export function resetData() {}
