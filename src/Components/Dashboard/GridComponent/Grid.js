import React, { useState } from "react";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import IconButton from "@mui/material/IconButton";
import "./styles.css";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import Button from "../../Common/Button/Button";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../../functions/Watchlist";

function Grid({ coin, delay }) {
  const isWatchlist = localStorage.getItem("watchlist")
    ? localStorage.getItem("watchlist").includes(coin.id)
    : false;
  const [isAdded, setIsAdded] = useState(false);

  return (
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
            <p className="coin-symbol">{coin.symbol}</p>
          </Tooltip>
          <Tooltip title="Name">
            <p className="coin-name">{coin.name}</p>
          </Tooltip>
        </div>

        {isWatchlist || isAdded ? (
          <div
            className="bookmark-icon-div"
            onClick={() => {
              setIsAdded(false);
              removeFromWatchlist(coin.id);
            }}
          >
            <Tooltip title="Remove from WatchList">
              <IconButton>
                <BookmarkRoundedIcon className="bookmark-icon" />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div
            className="bookmark-icon-div"
            onClick={() => {
              setIsAdded(true);
              addToWatchlist(coin.id);
            }}
          >
            <Tooltip title="Add to WatchList">
              <IconButton>
                <BookmarkBorderRoundedIcon className="bookmark-icon" />
              </IconButton>
            </Tooltip>
          </div>
        )}
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
          <strong>Total Volume :</strong> ${coin.total_volume.toLocaleString()}
        </p>
        <p className="volume-text">
          <strong>Total Market Cap :</strong> $
          {coin.market_cap.toLocaleString()}
        </p>
      </div>
      <a href={`/coin/${coin.id}`}>
        <div>
          <Button text="See Coin Stats" className="button-stats" />
        </div>
      </a>
    </motion.div>
  );
}

export default Grid;
