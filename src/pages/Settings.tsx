import { useState } from 'react'
import store from 'store2'
import toast from 'react-hot-toast'

function Settings() {
  const [tabTitle, setTabTitle] = useState(store('tabName') || '')
  const [tabIcon, setTabIcon] = useState(store('tabIcon') || '')

  return (
    <div className="center">
      <h1 className="font-bold text-4xl">Settings</h1>
      <div className="divider text-center">Tab Cloaking</div>
      <div className="join">
        <input type="text" placeholder="Tab name" onChange={(e) => setTabTitle(e.target.value)} defaultValue={tabTitle} className="input bg-base-200 join-item w-64 focus:outline-none placeholder:opacity-70 outline-none" />
        <button
          className="btn join-item"
          onClick={() => {
            store('tabName', tabTitle)
            document.title = tabTitle || 'Mocha'
            toast.success('Saved tab title')
          }}
        >
          Save
        </button>
      </div>

      <div className="join mt-1">
        <input type="text" placeholder="Tab icon" defaultValue={tabIcon} onChange={(e) => setTabIcon(e.target.value)} className="input bg-base-200 join-item w-64 focus:outline-none placeholder:opacity-70 outline-none" />
        <button
          className="btn join-item"
          onClick={() => {
            store('tabIcon', tabIcon)
            (document.querySelector('link[rel~=icon]') as HTMLLinkElement).href = tabIcon || '/icon-white.png'
            toast.success('Saved tab icon')
          }}
        >
          Save
        </button>
      </div>

      <div className="divider text-center">Proxy</div>

      <div className="form-control">
        <label className="label cursor-pointer w-64">
          <span className="label-text left-0">Ultraviolet</span>
          <input
            type="radio"
            name="radio-10"
            className="radio"
            defaultChecked={store('proxy') === 'uv' || !store('proxy')}
            onClick={() => {
              store('proxy', 'uv')
              toast.success('Set proxy to Ultraviolet')
            }}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer w-64">
          <span className="label-text mr-10">Dynamic (Unstable)</span>
          <input
            type="radio"
            name="radio-10"
            className="radio"
            defaultChecked={store('proxy') === 'dynamic'}
            onClick={() => {
              store('proxy', 'dynamic')
              toast.success('Set proxy to Dynamic')
            }}
          />
        </label>
      </div>
    </div>
  )
}

export default Settings

{
  /* <div className="center">
      <h1 className="font-bold text-4xl">Settings</h1>
      <div className="divider text-center">Tab Cloaking</div>
      <div className="join">
        <input type="text" placeholder="Tab name" onChange={(e) => setTabTitle(e.target.value)} defaultValue={tabTitle} className="input bg-base-200 join-item w-64 focus:outline-none placeholder:opacity-70 outline-none" />
        <button
          className="btn join-item"
          onClick={() => {
            store('tabName', tabTitle)
            document.title = tabTitle || 'Mocha'
            toast.success('Saved tab title')
          }}
        >
          Save
        </button>
      </div>

      <div className="join mt-1">
        <input type="text" placeholder="Tab icon" defaultValue={tabIcon} onChange={(e) => setTabIcon(e.target.value)} className="input bg-base-200 join-item w-64 focus:outline-none placeholder:opacity-70 outline-none" />
        <button
          className="btn join-item"
          onClick={() => {
            store('tabIcon', tabIcon)
            document.querySelector('link[rel~=icon]').href = tabIcon || '/icon-white.png'
            toast.success('Saved tab icon')
          }}
        >
          Save
        </button>
      </div>

      <div className="divider text-center">Proxy</div>

      <div className="form-control">
        <label className="label cursor-pointer w-64">
          <span className="label-text left-0">Ultaviolet</span>
          <input
            type="radio"
            name="radio-10"
            className="radio"
            defaultChecked={store('proxy') === 'uv' || !store('proxy')}
            onClick={(e) => {
              store('proxy', 'uv')
              toast.success('Set proxy to Ultraviolet')
            }}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer w-64">
          <span className="label-text mr-10">Dynamic</span>
          <input
            type="radio"
            name="radio-10"
            className="radio"
            defaultChecked={store('proxy') === 'dynamic'}
            onClick={(e) => {
              store('proxy', 'dynamic')
              toast.success('Set proxy to Dynamic')
            }}
          />
        </label>
      </div>
    </div> */
}
