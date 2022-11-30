import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Pages/home";
import DashboardPage from "./Pages/dashboard";
import CoinPage from './Pages/coin';
import ComparePage from './Pages/compare';
import WatchListPage from './Pages/watchList';
import { useEffect } from 'react';

function App() {
  var cursor;
  var cursorPointer;

  useEffect(() => {
    cursor = document.getElementById("cursor");
    document.body.addEventListener("mousemove", function (e) {
      return (
        (cursor.style.left = e.clientX + "px"),
        (cursor.style.top = e.clientY + "px")
      );
    });
    document.body.addEventListener("mousedown", function (e) {
      return (
        (cursor.style.height = "0.5rem"),
        (cursor.style.width = "0.5rem")
      );
    });
    document.body.addEventListener("mouseup", function (e) {
      return (
        (cursor.style.height = "0.3rem"),
        (cursor.style.width = "0.3rem")      
      );
    });
  }, []);

  return (
    <div>
      <div className="cursor" id="cursor" />
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
