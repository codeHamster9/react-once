import React from "react";
import logo from "./logo.svg";

import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="links">
          <Link to="/counter">Counter</Link>
          <Link to="/users">User</Link>
          <Link to="/">Home</Link>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <Outlet />
      </header>
    </div>
  );
}

export default App;
