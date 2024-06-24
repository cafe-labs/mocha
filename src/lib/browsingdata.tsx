import { openDB } from 'idb'
import { CircleCheck } from 'lucide-solid'
import toast from 'solid-toast'
import { BrowsingData } from './types'

export async function exportData() {
  const db = await openDB('__op', 1, {
    upgrade(db) {
      const store = db.createObjectStore('cookies', {
        keyPath: 'id'
      })
      store.createIndex('path', 'path')
    }
  })
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
  const cookies = await db.getAll('cookies')
  data.cookies = cookies

  const link = document.createElement('a')
  const file = new Blob([JSON.stringify(data)], { type: 'text/plain' })
  link.href = URL.createObjectURL(file)
  link.download = `mocha-export-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(link.href)
  link.remove()

  toast.custom(() => {
    return (
      <div class="toast toast-center toast-top">
        <div class="alert alert-success w-80">
          <CircleCheck />
          <span>Browsing data exported.</span>
        </div>
      </div>
    )
  })
}

export async function importData(fileImport: HTMLInputElement) {
  const db = await openDB('__op', 1, {
    upgrade(db) {
      const store = db.createObjectStore('cookies', {
        keyPath: 'id'
      })
      store.createIndex('path', 'path')
    }
  })
  fileImport.click()

  fileImport.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files![0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async function (e) {
      const content = e.target?.result

      const data: BrowsingData = JSON.parse(content as string)

      await resetData()

      data.localStorage?.forEach((item) => {
        localStorage.setItem(item.key, item.value)
      })

      data.cookies?.forEach(async (item) => {
        await db.add('cookies', item)
      })

      toast.custom(() => {
        return (
          <div class="toast toast-center toast-top">
            <div class="alert alert-success">
              <CircleCheck />
              <span>Browsing data imported from {file.name}.</span>
            </div>
          </div>
        )
      })
    }
    reader.readAsText(file)
  })
}

export async function resetData() {
  const db = await openDB('__op', 1, {
    upgrade(db) {
      const store = db.createObjectStore('cookies', {
        keyPath: 'id'
      })
      store.createIndex('path', 'path')
    }
  })

  for (var key in localStorage) {
    if (key.startsWith('__uv$')) localStorage.removeItem(key)
  }

  await db.clear('cookies')

  toast.custom(() => {
    return (
      <div class="toast toast-center toast-top">
        <div class="alert alert-success">
          <CircleCheck />
          <span>Browsing data deleted.</span>
        </div>
      </div>
    )
  })
}
