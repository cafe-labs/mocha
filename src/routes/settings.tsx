import { createSignal, onMount } from 'solid-js'
import toast from 'solid-toast'
import store from 'store2'
import { PanicData, TabData } from '../lib/types'
import { handleTabCloak } from '../lib/cloak'

export default function Settings() {
  const [tabName, setTabName] = createSignal('')
  const [tabIcon, setTabIcon] = createSignal('')

  const [panicKey, setPanicKey] = createSignal('')
  const [panicUrl, setPanicUrl] = createSignal('https://classroom.google.com/h')

  onMount(() => {
    const tabData = store('tab') as TabData
    if (tabData.name) setTabName(tabData.name)
    if (tabData.icon) setTabIcon(tabData.icon)

    const panicData = store('panic') as PanicData
    if (panicData.key) setPanicKey(panicData.key)
    if (panicData.url) setPanicUrl(panicData.url)
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

    handleTabCloak()

    toast.custom(() => {
      return (
        <div class="toast toast-top toast-center">
          <div class="alert alert-success w-80">
            <span>Settings saved.</span>
          </div>
        </div>
      )
    })
  }

  return (
    <div class="flex flex-col items-center gap-4">
      <div class="flex flex-wrap justify-center gap-6 box-border pt-8">
        <div class="flex flex-col gap-4 items-center bg-base-200 w-80 rounded-box p-4">
          <h1 class="text-2xl font-semibold">Cloaking</h1>
          <p class="text-xs">Change how your tab appears in your browser</p>
          <input type="text" class="input input-bordered w-full" value={tabName()} onInput={(e) => setTabName(e.target.value)} placeholder="Tab name" />
          <input type="text" class="input input-bordered w-full" value={tabIcon()} onInput={(e) => setTabIcon(e.target.value)} placeholder="Tab icon" />
        </div>
        <div class="flex flex-col gap-4 items-center bg-base-200 w-80 rounded-box p-4">
          <h1 class="text-2xl font-semibold">Panic Key</h1>
          <p class="text-xs text-center">Set a key to redirect to a URL (works inside proxy)</p>
          <input type="text" class="input input-bordered w-full" value={panicKey()} onInput={(e) => setPanicKey(e.target.value)} placeholder="Panic key" />
          <input type="text" class="input input-bordered w-full" value={panicUrl()} onInput={(e) => setPanicUrl(e.target.value)} placeholder="Panic URL" />
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
            save()
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
