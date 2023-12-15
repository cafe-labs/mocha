import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import './App.css'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Proxy from './pages/Proxy'
import Settings from './pages/Settings'

import store from 'store2'
import config from './config'

function App() {
  useEffect(() => {
    // Service worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`/uv-sw.js`, { scope: '/~/uv/' }).then(
        () => {
          console.log('Ultraviolet service worker registered')
        },
        (error) => {
          console.error(`Ultraviolet service worker failed: ${error}`)
        }
      )

      navigator.serviceWorker.register(`/dynamic-sw.js`, { scope: '/~/dynamic/' }).then(
        () => {
          console.log('Dynamic service worker registered')
        },
        (error) => {
          console.error(`Dynamic service worker failed: ${error}`)
        }
      )
    } else {
      console.error('Service workers are not supported.')
    }
    // Theme switcher
    if (store('lightmode')) document.querySelector('html')!.dataset.theme = config.lightTheme

    // async function checkBare() {
    //   var bareData = await fetch(__uv$config.bare).catch(e => {

    //   });
    //   bareData = await bareData.json()

    //   if (bareData.versions) {
    //     toast.success('Connected to Bare server')
    //   } else {
    //     toast.error('Unable to connect to Bare server')
    //   }
    // };

    // checkBare().catch(console.error);

    // Tab cloaking
    if (store('tabName')) document.title = store('tabName')
    if (store('tabIcon')) (document.querySelector('link[rel~="icon"]') as HTMLLinkElement).href = store('tabIcon')

    // Set default proxy
    if (!store('proxy')) store('proxy', 'uv')
  }, [])

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="view" element={<Proxy />}></Route>
        <Route path="settings" element={<Settings />}></Route>
      </Routes>
    </>
  )
}

export default App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
