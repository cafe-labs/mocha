import { createSignal, onMount } from 'solid-js'
import toast from 'solid-toast'
import store from 'store2'
import { TabData } from '../lib/types'
import { handleTabCloak } from '../lib/cloak'

export default function Settings() {
  const [tabName, setTabName] = createSignal('')
  const [tabIcon, setTabIcon] = createSignal('')

  onMount(() => {
    const tabData = store('tab') as TabData

    if (tabData.name) {
      setTabName(tabData.name)
    }

    if (tabData.icon) {
      setTabIcon(tabData.icon)
    }
  })

  function save() {
    store('tab', {
      name: tabName(),
      icon: tabIcon()
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
        <div class="flex flex-col gap-4 items-center bg-base-200 w-64 rounded-box p-4">
          <h1 class="text-2xl font-semibold">Cloaking</h1>
          <input type="text" class="input input-bordered w-full" value={tabName()} onInput={(e) => setTabName(e.target.value)} placeholder="Tab name" />
          <input type="text" class="input input-bordered w-full" value={tabIcon()} onInput={(e) => setTabIcon(e.target.value)} placeholder="Tab icon" />
        </div>
      </div>
      <button class="btn btn-primary px-16" onClick={save}>
        Save
      </button>
    </div>
  )
}
