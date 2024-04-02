import { ParentProps, onMount } from 'solid-js'
import { Toaster } from 'solid-toast'
import Navbar from './components/navbar'
import { handleTabCloak } from './lib/cloak'
import store from 'store2'
export default function Layout(props: ParentProps) {
  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/~/'
      })
    }

    

    handleTabCloak()
  })
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" />
      {props.children}
    </div>
  )
}
