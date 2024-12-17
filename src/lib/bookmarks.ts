import { createSignal } from 'solid-js'
import type { Bookmark } from './types'
import store from 'store2'

type Return = {
  status: 'added' | 'removed'
}

export const [bookmarks, setBookmarks] = createSignal<Bookmark[]>([])

export function handleBookmark(bookmark: Bookmark): Return {
  if (bookmarks().some((value) => value.url === bookmark.url)) {
    store(
      'bookmarks',
      bookmarks().filter((value) => value.url !== bookmark.url)
    )

    setBookmarks(store('bookmarks'))

    return {
      status: 'removed'
    }
  }

  store('bookmarks', [
    ...bookmarks(),
    {
      ...bookmark
    }
  ])

  setBookmarks(store('bookmarks'))

  return {
    status: 'added'
  }
}
