import { useEffect, useState } from "react";
import Card from "../components/Card";
import store from "store2";
import toast from "react-hot-toast";

function Settings() {
  const [tabName, setTabName] = useState();
  const [tabIcon, setTabIcon] = useState();

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
          value={tabName}
          onChange={(e) => setTabName(e.target.value)}
          className="input bg-base-200 join-item w-64 focus:outline-none placeholder:opacity-70 outline-none"
        />
        <button className="btn join-item">Save</button>
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

      <div className="divider w-315 text-center">Bookmarks</div>
      <button className="btn" onClick={store("bookmarks", [])}>Initialize bookmarks</button>
    </div>
  );
}

export default Settings;

/*
<div className="center">
            <div className="inline-grid grid-cols-3 gap-4 w-[75vw] pl-4">
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Tab cloak</h2>
                        <p>Set a tab name and icon to be displayed instead of Mocha</p>
                        <input type="text" className="input" />
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        */
