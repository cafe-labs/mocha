import { ParentProps, onMount } from 'solid-js'
import Navbar from './components/navbar'
export default function Layout(props: ParentProps) {
  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register("/sw.js", {
        scope: '/~/'
      })
    }
  })
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  )
}
