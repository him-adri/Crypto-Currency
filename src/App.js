import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Pages/home";
import DashboardPage from "./Pages/dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
