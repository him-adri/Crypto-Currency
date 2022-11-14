import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {} from '@mui/material'
import "./style.css";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="drawerDiv">
      <MenuRoundedIcon
        className="link"
        style={{ fontSize: "1.5rem", margin: 0 }}
        onClick={() => setOpen(true)}
      />
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div className="drawer">
          <a href="/">
            <p className="link">Home</p>
          </a>
          <a href="/compare">
            <p className="link">Compare</p>
          </a>
          <a href="/dashboard">
            <p className="link">Dashboard</p>
          </a>
        </div>
      </Drawer>
    </div>
  );
}