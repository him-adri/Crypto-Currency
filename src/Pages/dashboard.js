import React, { useEffect, useState } from "react";
import axios from "axios";
import { DASHBOARD_API_URL } from "../Constant";
import Header from "../Components/Common/Header";
import Tabs from "../Components/Dashboard/Tabs/tabs";
import Search from "../Components/Dashboard/Search/search";
import Loading from "../Components/Common/Loading/loading";
import PaginationComponent from "../Components/Dashboard/PaginationComponent/Pagination";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Button from "../Components/Common/Button/Button";

function DashboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCoins, setPageCoins] = useState([]);

  useEffect(() => {
    axios.get(DASHBOARD_API_URL).then((response) => {
      if (response.status === 200) {
        console.log("RESOPONSE DATA", response.data);
        setData(response.data);
        setLoading(false);
        setPageCoins(response.data.slice(0, 10));
      } else {
        console.log("ERROR");
      }
    });
  }, []);

  var filteredCoins = data.filter((item) => {
    if (
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return item;
    }
  });

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  let mybutton = document.getElementById("myBtn");
  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "flex";
    } else {
      mybutton.style.display = "none";
    }
  }

  const handleChange = (event, value) => {
    setPageNumber(value);
    setPageCoins(data.slice((value - 1) * 10, (value - 1) * 10 + 10));
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Search search={search} setSearch={setSearch} />
          {search && filteredCoins.length == 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "80vh",
              }}
            >
              <img
                style={{ textAlign: "center", color: "var(--grey)" }}
                src={require("../Assets/200w-unscreen.gif")}
              />
              <h1 style={{ textAlign: "center" }}>
                Can't Find What You Were Looking For 🥲
              </h1>
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a href="/dashboard">
                  <Button text="Clear Search" onClick={() => setSearch("")} />
                </a>
              </div>
            </div>
          ) : (
            <Tabs data={search ? filteredCoins : pageCoins} />
          )}
          {!search && (
            <PaginationComponent
              pageNumber={pageNumber}
              handleChange={handleChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default DashboardPage;
