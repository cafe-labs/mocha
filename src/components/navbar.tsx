import { A } from '@solidjs/router'
import { Joystick, Layers, Settings } from 'lucide-solid'
export default function Navbar() {
  return (
    <div class="navbar px-6">
      <div class="navbar-start">
        <A href="/">
          <div class="btn btn-ghost -ml-2 flex h-11 min-h-11 gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-7 w-7">
              <path fill="currentColor" d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z" />
            </svg>
            <h1 class="text-2xl font-semibold">Mocha</h1>
          </div>
        </A>
      </div>

      <div class="navbar-end gap-2">
        <A href="/games">
          <button class="btn btn-ghost h-10 min-h-10">
            <Joystick class="h-5 w-5" /> Games
          </button>
        </A>
        <A href="/shortcuts">
          <button class="btn btn-ghost h-10 min-h-10">
            <Layers class="h-5 w-5" /> Shortcuts
          </button>
        </A>
        <A href="/settings">
          <button class="btn btn-ghost h-10 min-h-10">
            <Settings class="h-5 w-5" /> Settings
          </button>
        </A>
      </div>
    </div>
  )
}
