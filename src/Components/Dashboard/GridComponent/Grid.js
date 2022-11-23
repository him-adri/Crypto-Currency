import React from "react";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import "./styles.css";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";

function Grid({ coin, delay }) {
  return (
    <a href={`/coin/${coin.id}`}>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: delay }}
        className={`grid-box ${
          coin.price_change_percentage_24h < 0 && "grid-box-red"
        }`}
      >
        <div className="info-flex">
          <Tooltip title="Logo">
            <img src={coin.image} className="coin-logo" />
          </Tooltip>
          <div className="name-flex">
            <Tooltip title="Symbol">
              <p className="coin-symbol">{coin.symbol}-USD</p>
            </Tooltip>
            <Tooltip title="Name">
              <p className="coin-name">{coin.name}</p>
            </Tooltip>
          </div>
        </div>
        <div>
          {coin.price_change_percentage_24h > 0 ? (
            <Tooltip title="Percentage Changed in 24hrs">
              <div className="chip-flex">
                <div className="coin-chip">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
                <TrendingUpRoundedIcon className="icon" />
              </div>
            </Tooltip>
          ) : (
            <Tooltip title="Percentage Changed in 24hrs">
              <div className="chip-flex">
                <div className="coin-chip chip-red">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
                <TrendingDownRoundedIcon className="icon chip-red" />
              </div>
            </Tooltip>
          )}
        </div>
        <Tooltip title="Price">
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
        </Tooltip>
        <div>
          <p className="volume-text">
            <strong>Total Volume :</strong> $
            {coin.total_volume.toLocaleString()}
          </p>
          <p className="volume-text">
            <strong>Total Market Cap :</strong> $
            {coin.market_cap.toLocaleString()}
          </p>
        </div>
      </motion.div>
    </a>
  );
}

export default Grid;
