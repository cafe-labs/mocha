import React, { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import "./scripts/tabCloak";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Proxy from "./pages/Proxy";
import Settings from "./pages/Settings";
import store from "store2";

function App() {
  useEffect(() => {
    themeChange(false); // Handle light and dark mode
    async function checkBare() {
      var bareData = await fetch(__uv$config.bare).catch(e => {
        
      });
      bareData = await bareData.json()

      if (bareData.versions) {
        toast.success("Connected to Bare server")
      } else {
        toast.error("Unable to connect to Bare server")
      }
    };

    checkBare().catch(console.error);

    // Tab cloaking
    if (store("tabTitle")) document.title = store("tabTitle")
    if (store("tabIcon")) document.querySelector("link[rel~='icon']").href = store("tabIcon")
  }, []);

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
  );
}

export default App;
