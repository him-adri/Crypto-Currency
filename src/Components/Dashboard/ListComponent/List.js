import React, { useEffect, useState } from "react";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import "./style.css";
import { convertNumbers } from "../../../functions/convertNumber";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";

function List({ coin, delay }) {
  const [volume, setVolume] = useState("");

  useEffect(() => {
    setVolume(convertNumbers(parseInt(coin.total_volume)));
  }, []);

  return (
    <a href={`/coin/${coin.id}`}>
      <motion.tr
        className="list-row"
        initial={{ x: -10, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: delay }}
      >
        <td className="td-img">
          <Tooltip title="Logo">
            <img src={coin.image} className="coin-logo" />
          </Tooltip>
        </td>
        <td className="td-name-flex">
          <div className="name-flex ">
            <Tooltip title="Symbol">
              <p className="coin-symbol name-text">{coin.symbol}-USD</p>
            </Tooltip>
            <Tooltip title="Name">
              <p className="coin-name name-text">{coin.name}</p>
            </Tooltip>
          </div>
        </td>
        <td className="td-chip-flex">
          {coin.price_change_percentage_24h > 0 ? (
            <Tooltip title="Percentage Changed in 24hrs">
              <div className="chip-flex">
                <div className="coin-chip percentage-text">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
                <TrendingUpRoundedIcon className="icon chip-icon" />
              </div>
            </Tooltip>
          ) : (
            <Tooltip title="Percentage Changed in 24hrs">
              <div className="chip-flex">
                <div className="coin-chip chip-red percentage-text">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
                <TrendingDownRoundedIcon className="icon chip-red chip-icon" />
              </div>
            </Tooltip>
          )}
        </td>
        <td>
          <Tooltip title="Price">
            <p
              className="coin-price name-text"
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
        </td>
        <td className="td-mkt-cap">
          <Tooltip title="Total Volume">
            <p>${coin.total_volume.toLocaleString()}</p>
          </Tooltip>
        </td>
        <td className="td-mkt-cap">
          <Tooltip title="Market Cap">
            <p>${coin.market_cap.toLocaleString()}</p>
          </Tooltip>
        </td>
        <td className="td-vol-cap">
          <p>${volume}</p>
        </td>
      </motion.tr>
    </a>
  );
}

export default List;
