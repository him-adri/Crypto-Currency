import React, { useEffect, useState } from "react";
import Button from "../Components/Common/Button/Button";
import Header from "../Components/Common/Header";
import TopButton from "../Components/Common/TopButton/topButton";
import Search from "../Components/Dashboard/Search/search";
import Tabs from "../Components/Dashboard/Tabs/tabs";
import { get100Coins } from "../functions/get100Coins";

function WatchListPage() {
  const watchlist = localStorage.getItem("watchlist")
    ? localStorage.getItem("watchlist").split(",")
    : [];

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    console.log("watchlist was changed");
  }, [watchlist]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await get100Coins();
    var myCoins = response.filter((coins) => watchlist.includes(coins.id));
    setCoins(myCoins);
  };

  return (
    <div>
      <Header />
      <div>
        {coins.length > 0 ? (
          <>
            <Tabs data={coins} />
          </>
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>
              Your watchlist is Currently Empty
            </h1>
            <p style={{ textAlign: "center", color: "var(--grey)" }}>
              Please Add Coins in your watchlist
            </p>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a href="/dashboard">
                <Button text="Dashboard" />
              </a>
            </div>
          </div>
        )}
      </div>
      <TopButton />
      {/* <Footer /> */}
    </div>
  );
}

export default WatchListPage;