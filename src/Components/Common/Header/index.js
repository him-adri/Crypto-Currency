import React from "react";
import Button from "../Button/Button";
import MobileDrawer from "./Drawer";
import "./style.css";

function Header() {
  return (
    <div className="navbar">
      <h1 className="heading">
        CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <div className="links">
        <a href="/">
          <p className="link">Home</p>
        </a>
        <a href="/compare">
          <p className="link">Compare</p>
        </a>
        <a href="/dashboard">
          <Button text="dashboard" />
        </a>
      </div>
      <MobileDrawer />
    </div>
  );
}

export default Header;