import { useEffect, useState } from "react";
import Card from "../components/Card";
import store from "store2";
import toast from "react-hot-toast";

function Settings() {
  const [tabTitle, setTabTitle] = useState(store("tabName") || '');
  const [tabIcon, setTabIcon] = useState(store("tabIcon") || '');

  function changeProxy(proxy) {
    store("proxy", proxy);
    toast.success("Set proxy to " + proxy);
  }

  return (
    <div className="center">
      <h1 className="font-bold text-4xl">Settings</h1>
      <div className="divider w-315 text-center">Tab Cloaking</div>
      <div className="join">
        <input
          type="text"
          placeholder="Tab name"
          onChange={(e) => setTabTitle(e.target.value)}
          defaultValue={tabTitle}
          className="input bg-base-200 join-item w-64 focus:outline-none placeholder:opacity-70 outline-none"
        />
        <button
          className="btn join-item"
          onClick={() => {
            store("tabName", tabTitle);
            document.title = tabTitle;
            toast.success("Set tab title");
          }}
        >
          Save
        </button>
      </div>

      <div className="join mt-1">
        <input
          type="text"
          placeholder="Tab icon"
          onChange={(e) => setTabIcon(e.target.value)}
          className="input bg-base-200 join-item w-64 focus:outline-none placeholder:opacity-70 outline-none"
        />
        <button className="btn join-item">Save</button>
      </div>

      <div className="divider w-315 text-center">Proxy</div>

      <div className="form-control">
        <label className="label cursor-pointer w-64">
          <span className="label-text left-0">Ultaviolet</span>
          <input
            type="radio"
            name="radio-10"
            className="radio"
            defaultChecked={store("proxy") === "ultraviolet" || !store("proxy")}
            onClick={(e) => changeProxy("ultraviolet")}
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
            defaultChecked={store("proxy") === "dynamic"}
            onClick={(e) => changeProxy("dynamic")}
          />
        </label>
      </div>
    </div>
  );
}

export default Settings;
