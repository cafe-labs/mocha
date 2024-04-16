import { transports } from './settings/transport'
export interface TabData {
  name: string | null
  icon: string | null
}

export interface PanicData {
  key: string | null
  url: string | null
}

export interface aboutblankData {
  enabled: boolean
}

export interface TransportData {
  transport: keyof typeof transports
}

export interface ThemeData {
  theme: string | null
}

export interface GameData {
  name: string
  id: string
  file: string
  image: string
}

export interface ShortcutData {
  name: string
  url: string
  image: string
}

export interface DebugData {
  enabled: boolean
}

export interface ContentWindow extends Window {
  __uv$location: Location
  eruda: any
}

declare global {
  interface Window {
    eruda?: any
  }
}
