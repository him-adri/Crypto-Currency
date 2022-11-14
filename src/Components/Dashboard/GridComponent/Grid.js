import React from "react";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import "./styles.css";
function Grid({ coin }) {
  return (
    <div
      className={`grid-box ${
        coin.price_change_percentage_24h < 0 && "grid-box-red"
      }`}
    >
      <div className="info-flex">
        <img src={coin.image} className="coin-logo" />
        <div className="name-flex">
          <p className="coin-symbol">{coin.symbol}-USD</p>
          <p className="coin-name">{coin.name}</p>
        </div>
      </div>
      {coin.price_change_percentage_24h > 0 ? (
        <div className="chip-flex">
          <div className="coin-chip">
            {coin.price_change_percentage_24h.toFixed(2) + " %"}
          </div>
          <TrendingUpRoundedIcon className="icon" />
        </div>
      ) : (
        <div className="chip-flex">
          <div className="coin-chip chip-red">
            {coin.price_change_percentage_24h.toFixed(2) + " %"}
          </div>
          <TrendingDownRoundedIcon className="icon chip-red" />
        </div>
      )}

      <p
        className="coin-price"
        style={{
          color:
            coin.price_change_percentage_24h < 0
              ? "var(--red)"
              : "var(--green)",
        }}
      >
        $ {coin.current_price.toLocaleString()}
      </p>
      <div>
        <p className="volume-text">
          <strong>Total Volume :</strong> ${coin.total_volume.toLocaleString()}
        </p>
        <p className="volume-text">
          <strong>Total Market Cap :</strong> $
          {coin.market_cap.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default Grid;