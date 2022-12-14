import axios from "axios";
import React, { useEffect, useState } from "react";
import LineChart from "../Components/Coin/Chart";
import Info from "../Components/Coin/Info/info";
import SelectCoin from "../Components/Coin/SelectCoin/SelectCoin";
import SelectDays from "../Components/Coin/SelectDays/selectDays";
import TogglePrice from "../Components/Coin/ToggleComponent/toggle";
import Header from "../Components/Common/Header";
import Loading from "../Components/Common/Loading/loading";
import List from "../Components/Dashboard/ListComponent/List";
import { DASHBOARD_API_URL } from "../Constant";
import { convertNumbers } from "../functions/convertNumber";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { getDateArray } from "../functions/getDateArray";
import { setCoinDataFunction } from "../functions/setCoinData";

const ComparePage = () => {
  const [coin1, setCoin1] = useState("bitcoin"); //to have the coins in the mui ~select
  const [coin2, setCoin2] = useState("ethereum");
  const [days, setDays] = useState(120); //to change the day
  const [priceType, setPriceType] = useState("prices");
  const [loading, setLoading] = useState(true);
  const [allCoins, setAllCoins] = useState([]); //to get all the coins in the select
  const [coinData1, setCoinData1] = useState({}); //to get the data of the respective coins
  const [coinData2, setCoinData2] = useState({}); //to get the data of the respective coins
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{}],
  });
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks:
          priceType == "market_caps"
            ? {
                callback: function (value) {
                  return "$" + convertNumbers(value);
                },
              }
            : priceType == "total_volumes"
            ? {
                callback: function (value) {
                  return convertNumbers(value);
                },
              }
            : {
                callback: function (value, index, ticks) {
                  return "$" + value.toLocaleString();
                },
              },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        ticks:
          priceType == "market_caps"
            ? {
                callback: function (value) {
                  return "$" + convertNumbers(value);
                },
              }
            : priceType == "total_volumes"
            ? {
                callback: function (value) {
                  return convertNumbers(value);
                },
              }
            : {
                callback: function (value, index, ticks) {
                  return "$" + value.toLocaleString();
                },
              },
      },
    },
  };

  useEffect(() => {
    axios
      .get(DASHBOARD_API_URL)
      .then((response) => {
        setAllCoins(response.data);
        // console.log("dataComparePAge" , response.data)
      })
      .catch((error) => {
        console.log("Compare Error", error);
      });
    getCoinsData();
  }, []);

  const getCoinsData = async () => {
    const data1 = await getCoinData(coin1);
    const data2 = await getCoinData(coin2);

    if (data1) {
      setCoinDataFunction(setCoinData1, data1);
    }
    if (data2) {
      setCoinDataFunction(setCoinData2, data2);
    }
    getPrices(coin1, coin2, days, priceType);
    setLoading(false);
  };

  const getPrices = async (coin1, coin2, days, priceType) => {
    const prices1 = await getCoinPrices(coin1, days, priceType);
    const prices2 = await getCoinPrices(coin2, days, priceType);
      setChartData({
        labels: prices1?.map((data) => getDateArray(data[0])),
        datasets: [
          {
            label: `${coin1.toUpperCase()}`,
            data: prices1?.map((data) => data[1]),
            borderWidth: 1,
            fill: false,
            tension: 0.25,
            backgroundColor: "transparent",
            borderColor: "#888",
            pointRadius: 0,
            yAxisID: "y",
          },
          {
            label: `${coin2.toUpperCase()}`,
            data: prices2?.map((data) => data[1]),
            borderWidth: 1,
            fill: false,
            tension: 0.25,
            backgroundColor: "transparent",
            borderColor: "#3a80e9",
            pointRadius: 0,
            yAxisID: "y1",
          },
        ],
      });
  };

  const handleCoinChange = async (e, isCoin2) => {
    if (!isCoin2) {
      setCoin1(e.target.value);
      const data1 = await getCoinData(e.target.value);
      if (data1) {
        setCoinDataFunction(setCoinData1, data1);
        getPrices(e.target.value, coin2, days, priceType);
      }
    } else {
      setCoin2(e.target.value);
      const data2 = await getCoinData(e.target.value);
      if (data2) {
        setCoinDataFunction(setCoinData2, data2);
        getPrices(coin1, e.target.value,days, priceType);
      }
    }
  };
  const handlePriceChange = async (event) => {
    setPriceType(event.target.value);
    getPrices(coin1, coin2, days, event.target.value)
  };
  return (
    <>
      <Header />
      <div className="div-flex">
        <p className="crypto-heading">Crypto 1: </p>
        <SelectCoin
          coin={coin1}
          handleChange={(e) => handleCoinChange(e)}
          allCoins={allCoins.filter((coin) => coin.id != coin2)}
        />
        <p className="crypto-heading">Crypto 2: </p>
        <SelectCoin
          coin={coin2}
          handleChange={(e) => handleCoinChange(e, true)}
          allCoins={allCoins.filter((coin) => coin.id != coin1)}
        />
        <SelectDays className="crypto-heading"
          notext={true}
          days={days}
          handleDaysChange={(e) => {
            getPrices(coin1,coin2,e.target.value, priceType)
            setDays(e.target.value)}}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grey-cointainer" style={{marginBottom: "1rem"}}>
            <List coin={coinData1} delay={0.3}/>
          </div>
          <div className="grey-cointainer" style={{marginBottom: "1rem"}}>
            <List coin={coinData2} delay={0.3}/>
          </div>
          <div className="grey-cointainer" style={{marginBottom: "1rem"}}>
          <TogglePrice
              priceType={priceType}
              handleChange={handlePriceChange}
            />
            <LineChart chartData={chartData} options={options} style={{marginBottom: "1rem"}}/>
          </div>

          <div className="grey-cointainer" style={{marginBottom: "2rem"}}>
            <Info name={coinData1.name} desc={coinData1.desc} />
          </div>
          <div className="grey-cointainer" style={{marginBottom: "2rem"}}>
            <Info name={coinData2.name} desc={coinData2.desc} />
          </div>
        </>
      )}
    </>
  );
};
export default ComparePage;
