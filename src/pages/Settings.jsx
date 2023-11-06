import { useEffect, useState } from 'react'
import Card from '../components/Card'
import store from 'store2'
import toast from 'react-hot-toast'

function Settings() {
  const [tabTitle, setTabTitle] = useState(store('tabName') || '')
  const [tabIcon, setTabIcon] = useState(store('tabIcon') || '')
  const [bareServer, setBareServer] = useState(store('bareServer') || '')

  return (
    <div className="flex justify-center pt-12 gap-4 [&>*]:w-72">
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Tab Cloak</h2>
          <input type="text" placeholder="Tab name" onChange={(e) => setTabTitle(e.target.value)} defaultValue={tabTitle} className="input bg-base-300 placeholder:opacity-70 " />
          <button
            className="btn bg-base-100"
            onClick={() => {
              store('tabName', tabTitle)
              document.title = tabTitle || 'Mocha'

              store('tabIcon', tabIcon)
              document.querySelector('link[rel~=icon]').href = tabIcon || '/icon-white.png'

              toast.success('Saved!')
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Proxy</h2>
          <div className="form-control">
            <label className="label cursor-pointer">
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
            <label className="label cursor-pointer">
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
        </div>
      </div>
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
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
