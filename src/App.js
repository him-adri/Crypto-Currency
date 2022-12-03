import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Pages/home";
import DashboardPage from "./Pages/dashboard";
import CoinPage from './Pages/coin';
import ComparePage from './Pages/compare';
import WatchListPage from './Pages/watchList';
import { useEffect } from 'react';
import MouseIcon from '@mui/icons-material/Mouse';

function App() {
  var arrow;

  useEffect(() => {
    arrow = document.getElementById("arrow");
    document.body.addEventListener("mousemove", function (e) {
      return (
        (arrow.style.left = e.clientX + "px"),
        (arrow.style.top = e.clientY + "px")
      );
    });
    document.body.addEventListener("mousedown", function (e) {
      return (
        (arrow.style.height = "2.3rem"),
        (arrow.style.width = "2.3rem")
      );
    });
    document.body.addEventListener("mouseup", function (e) {
      return (
        (arrow.style.height = "1.3rem"),
        (arrow.style.width = "1.3rem")      
      );
    });
  }, []);

  return (
    <div>
      <div>
        <MouseIcon  className='arrow' id="arrow" />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path='/coin/:id' element={<CoinPage/>} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/watchlist" element={<WatchListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
