import React from "react";
import "./App.css";
import ThxDrawer from "./components/thx-drawer/ThxDrawer";
import ThxWindow from "./components/thx-window/ThxWindow";

function App() {
  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <ThxDrawer></ThxDrawer>
        <ThxWindow></ThxWindow>
      </div>
    </div>
  );
}

export default App;
