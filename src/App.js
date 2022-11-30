import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Pages/home";
import DashboardPage from "./Pages/dashboard";
import CoinPage from './Pages/coin';
import ComparePage from './Pages/compare';
import WatchListPage from './Pages/watchList';

function App() {
  return (
    <div>
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
