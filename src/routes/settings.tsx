import { createSignal, onMount } from 'solid-js'
import toast from 'solid-toast'
import store from 'store2'
import config from '../config'
import { handleTabCloak } from '../lib/settings/cloak'
import { handleDebug } from '../lib/settings/debug'
import { handleTheme } from '../lib/settings/theme'
import { DebugData, PanicData, TabData, ThemeData, TransportData, aboutblankData } from '../lib/types'

// @ts-expect-error
import { SetTransport } from '@mercuryworkshop/bare-mux'
import { handleTransport } from '../lib/settings/transport'

export default function Settings() {
  const [tabName, setTabName] = createSignal('')
  const [tabIcon, setTabIcon] = createSignal('')

  const [panicKey, setPanicKey] = createSignal('')
  const [panicUrl, setPanicUrl] = createSignal('https://classroom.google.com/h')

  const [aboutBlank, setAboutBlank] = createSignal('disabled')

  const [theme, setTheme] = createSignal('forest')

  const [debug, setDebug] = createSignal('disabled')

  const [transport, setTransport] = createSignal('epoxy')

  onMount(() => {
    const tabData = store('tab') as TabData
    if (tabData.name) setTabName(tabData.name)
    if (tabData.icon) setTabIcon(tabData.icon)

    const panicData = store('panic') as PanicData
    if (panicData.key) setPanicKey(panicData.key)
    if (panicData.url) setPanicUrl(panicData.url)

    const aboutblankData = store('aboutblank') as aboutblankData
    if (aboutblankData.enabled) {
      setAboutBlank('enabled')
    } else {
      setAboutBlank('disabled')
    }

    const themeData = store('theme') as ThemeData
    if (themeData.theme) setTheme(themeData.theme)

    const debugData = store('debug') as DebugData
    if (debugData.enabled) setDebug('enabled')

    const transportData = store('transport') as TransportData
    if (transportData.transport) setTransport(transportData.transport)
  })

  function save() {
    store('tab', {
      name: tabName(),
      icon: tabIcon()
    })

    store('panic', {
      key: panicKey(),
      url: panicUrl()
    })

    store('aboutblank', {
      enabled: aboutBlank() == 'enabled'
    })

    store('theme', {
      theme: theme()
    })

    store('debug', {
      enabled: debug() == 'enabled'
    })

    store('transport', {
      transport: transport()
    })

    handleTabCloak()
    handleDebug()
    handleTheme()
    handleTransport()

    toast.custom(() => {
      return (
        <div class="toast toast-center toast-top">
          <div class="alert alert-success w-80">
            <span>Settings saved.</span>
          </div>
        </div>
      )
    })
  }

  return (
    <div class="flex flex-col items-center gap-4">
      <div class="box-border flex flex-wrap justify-center gap-6 pt-8">
        <div class="flex w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">Cloaking</h1>
          <p class="text-xs">Change how your tab appears in your browser</p>
          <input type="text" class="input input-bordered w-full" value={tabName()} onInput={(e) => setTabName(e.target.value)} placeholder="Tab name" />
          <input type="text" class="input input-bordered w-full" value={tabIcon()} onInput={(e) => setTabIcon(e.target.value)} placeholder="Tab icon" />
        </div>

        <div class="flex w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">Panic Key</h1>
          <p class="text-center text-xs">Set a key to redirect to a URL (works inside proxy)</p>
          <input type="text" class="input input-bordered w-full" value={panicKey()} onInput={(e) => setPanicKey(e.target.value)} placeholder="Panic key" />
          <input type="text" class="input input-bordered w-full" value={panicUrl()} onInput={(e) => setPanicUrl(e.target.value)} placeholder="Panic URL" />
        </div>

        <div class="flex w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">about:blank</h1>
          <p class="text-center text-xs">Automatically open Mocha in an about:blank tab</p>
          <select class="select select-bordered w-full max-w-xs" value={aboutBlank()} onChange={(e) => setAboutBlank(e.target.value)}>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div class="flex w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">Theme</h1>
          <p class="text-center text-xs">Change how Mocha looks</p>
          <select class="select select-bordered w-full max-w-xs" value={theme()} onChange={(e) => setTheme(e.target.value)}>
            {config.themes.map((item, index) => {
              return <option value={item}>{index == 0 ? 'Default' : item.charAt(0).toUpperCase() + item.slice(1)}</option>
            })}
          </select>
        </div>

        <div class="flex w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">Debug</h1>
          <p class="text-center text-xs">Enable Eruda devtools to help debug issues </p>
          <select class="select select-bordered w-full max-w-xs" value={debug()} onChange={(e) => setDebug(e.target.value)}>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div class="flex w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
          <h1 class="text-2xl font-semibold">Transport</h1>
          <p class="text-center text-xs">Change how Mocha transports requests</p>
          <select class="select select-bordered w-full max-w-xs" value={transport()} onChange={(e) => setTransport(e.target.value)}>
            <option value="epoxy">Epoxy</option>
            <option value="libcurl">Libcurl</option>
          </select>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button class="btn btn-primary px-16" onClick={save}>
          Save
        </button>
        <button
          class="btn btn-error px-16"
          onClick={() => {
            setTabIcon('')
            setTabName('')
            setPanicKey('')
            setPanicUrl('https://classroom.google.com/h')
            setAboutBlank('disabled')
            setTheme('forest')
            save()
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
