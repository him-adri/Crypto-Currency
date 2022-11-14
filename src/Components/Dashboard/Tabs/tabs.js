import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import Grid from "../GridComponent/Grid";
import './styles.css';

export default function Tabs({ data }) {
  const [value, setValue] = useState("1");

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
              <Tab label="Grid" value="1" sx={style} />
              <Tab label="List" value="2" sx={style} />
            </TabList>
          </div>
          <TabPanel value="1">
            <div className="grid-flex">
              {data.map((item, i) => (
                <Grid coin={item}></Grid>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </ThemeProvider>
    </div>
  );
}
