import React, { useEffect, useState } from "react";
import axios from "axios";
import { DASHBOARD_API_URL } from "../Constant";
import Header from "../Components/Common/Header";
import Tabs from '../Components/Dashboard/Tabs/tabs'

function DashboardPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(DASHBOARD_API_URL).then((response) => {
      if (response.status === 200) {
        console.log("RESOPONSE DATA", response.data);
        setData(response.data);
      }else{
        console.log("ERROR");
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <Tabs data={data}/>
    </div>
  );
}

export default DashboardPage;
