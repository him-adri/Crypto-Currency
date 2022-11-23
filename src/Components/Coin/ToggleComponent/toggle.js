import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import "./styles.css";

function TogglePrice({ priceType, handleChange }) {
  return (
    <div className="toggle-div">
      <ToggleButtonGroup
        color="primary"
        value={priceType}
        onChange={handleChange}
        sx={{
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "#888; !important",
            backgroundColor: " #3a80e9",
          },
          borderColor: "#888;",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid !important",
            borderColor: "unset",
            color: " #888;",
          },
          "& .MuiToggleButton-standard": {
            color: "#888;",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: "#3a80e9",
            },
          },
        }}
      >
        <ToggleButton className="toggle-switch" value="prices">Price</ToggleButton>
        <ToggleButton className="toggle-switch" value="market_caps">Market Cap</ToggleButton>
        <ToggleButton className="toggle-switch" value="total_volumes">Total Volume</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default TogglePrice;