import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import Grid from "../GridComponent/Grid";
import List from '../ListComponent/List'
import './styles.css';

export default function Tabs({ data }) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    color: "var(--white)",
    width: "50vw",
    fontsize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <TabContext value={value}>
          <div>
            <TabList variant="fullWidth" onChange={handleChange}>
              <Tab label="Grid View" value="grid" sx={style} />
              <Tab label="List View" value="list" sx={style} />
            </TabList>
          </div>
          <TabPanel value={"grid"}>
            <div className="grid-flex">
              {data.map((item, i) => (
                <Grid coin={item} delay={(i % 4) * 0.1}></Grid>
              ))}
            </div>
          </TabPanel>
          <TabPanel value={"list"}>
            <table className="list-flex">
              {data.map((item, i) => (
                <List coin={item} delay={(i % 4) * 0.1} />
              ))}
            </table>
          </TabPanel>
        </TabContext>
      </ThemeProvider>
    </div>
  );
}
