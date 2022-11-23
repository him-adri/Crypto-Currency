import React, { useEffect, useState } from "react";
import axios from "axios";
import { DASHBOARD_API_URL } from "../Constant";
import Header from "../Components/Common/Header";
import Tabs from "../Components/Dashboard/Tabs/tabs";
import Search from "../Components/Dashboard/Search/search";
import Loading from "../Components/Common/Loading/loading";
import PaginationComponent from "../Components/Dashboard/PaginationComponent/Pagination";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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
        setPageCoins(response.data.slice(0,10));
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
          <Tabs data={search ? filteredCoins : pageCoins} />
          <div onClick={() => topFunction()} id="myBtn" className="top-btn">
            <ArrowUpwardIcon sx={{ color: "var(--blue)" }} />
          </div>
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
