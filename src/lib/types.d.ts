import type { transports } from './transport'

export interface TabData {
  name: string | null
  icon: string | null
}

export interface PanicData {
  key: string | null
  url: string | null
}

export interface AboutBlankData {
  enabled: boolean
}

export interface TransportData {
  transport: keyof typeof transports
}

export interface ThemeData {
  theme: string | null
}

export interface SearchEngineData {
  engine: 'google' | 'duckduckgo' | 'ecosia'
}

export interface GameData {
  name: string
  id: string
  file: string
  image: string
}

export interface BrowsingData {
  localStorage?: {
    key: string
    value: string
  }[]
  cookies?: {
    [key: string]: unknown
  }[]
}

export interface ShortcutData {
  name: string
  url: string
  image: string
}

export interface Bookmark {
  image: string
  title: string
  url: string
}

export interface DebugData {
  enabled: boolean
}

export interface DevtoolsData {
  enabled: boolean
}

export interface ContentWindow extends Window {
  __uv$location: Location
  // biome-ignore lint: we don't know dude
  eruda: any
}

export interface Patch {
  hostname: string
  works?: boolean
  execute?: (contentWindow: ContentWindow) => void // for injecting scripts into websites (not sure what it could be used for yet)
  suggestedTransport?: keyof typeof transports
}

declare global {
  interface Window {
    // biome-ignore lint: we don't know dude
    eruda?: any
  }
}
