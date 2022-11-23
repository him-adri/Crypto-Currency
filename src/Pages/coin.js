import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../Components/Coin/Chart";
import Info from "../Components/Coin/Info/info";
import SelectDays from "../Components/Coin/SelectDays/selectDays";
import TogglePrice from "../Components/Coin/ToggleComponent/toggle";
import Header from "../Components/Common/Header";
import Loading from "../Components/Common/Loading/loading";
import List from "../Components/Dashboard/ListComponent/List";
import { convertNumbers } from "../functions/convertNumber";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { getDateArray } from "../functions/getDateArray";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(120);
  const [loading, setLoading] = useState(true);
  const [priceType, setpriceType] = useState("prices");

  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - days));

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{}],
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
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
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    const data = await getCoinData(id);
    const prices = await getCoinPrices(id, days, priceType);

    if (data) {
      console.log("data", data);
      setCoin({
        id: data.id,
        name: data.name,
        symbol: data.symbol,
        image: data.image.large,
        desc: data.description.en,
        price_change_percentage_24h:
          data.market_data.price_change_percentage_24h,
        total_volume: data.market_data.total_volume.usd,
        current_price: data.market_data.current_price.usd,
        market_cap: data.market_data.market_cap.usd,
      });
      setLoading(false);
    }
    if (prices) {
      console.log("Prices", prices);
      setChartData({
        labels: prices?.map((data) => getDateArray(data[0])),
        datasets: [
          {
            data: prices?.map((data) => data[1]),
            fill: false,
            tension: 0.25,
            backgroundColor: "transparent",
            borderColor: "#888",
            pointRadius: 0,
          },
        ],
      });
    }
  };

  const handleDaysChange = async (event) => {
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceType);
    if (prices) {
      setChartData({
        labels: prices?.map((data) => getDateArray(data[0])),
        datasets: [
          {
            label: "Price",
            data: prices?.map((data) => data[1]),
            borderWidth: 1,
            fill: false,
            tension: 0.25,
            backgroundColor: "transparent",
            borderColor: "#888",
            pointRadius: 0,
          },
        ],
      });
    }
  };
  const handlePriceChange = async (event) => {
    setpriceType(event.target.value);
    const prices = await getCoinPrices(id, days, event.target.value);
    if (prices) {
      setChartData({
        labels: prices?.map((data) => getDateArray(data[0])),
        datasets: [
          {
            label: "Price",
            data: prices?.map((data) => data[1]),
            borderWidth: 1,
            fill: false,
            tension: 0.25,
            backgroundColor: "transparent",
            borderColor: "#888",
            pointRadius: 0,
          },
        ],
      });
    }
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grey-cointainer" style={{marginBottom: "1rem"}}>
            <List coin={coin} delay={0.5} />
          </div>
          <div className="grey-cointainer" style={{marginBottom: "1rem"}}>
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <TogglePrice
              priceType={priceType}
              handleChange={handlePriceChange}
            />
            <LineChart chartData={chartData} options={options}/>
          </div>
          <div className="grey-cointainer" style={{marginBottom: "2rem"}}>
            <Info name={coin.name} desc={coin.desc} />
          </div>
        </>
      )}
    </div>
  );
}

export default CoinPage;
