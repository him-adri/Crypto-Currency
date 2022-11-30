import { Alert } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import AlertBox from '../Components/AlertBox/alert';

export const addToWatchlist = (id) => {
    const previousList = localStorage.getItem("watchlist");
    console.log("Adding to watchlist...", id);
    if (!previousList || !previousList.includes(id)) {
      localStorage.setItem("watchlist", `${previousList},${id}`);
    }
  };
  
  export const removeFromWatchlist = (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this coin from the watchlist"
      )
    ) {
      const previousList = localStorage.getItem("watchlist").split(",");
      const newList = previousList.filter((item) => item != id);
      console.log("newlist is>>", newList.toString());
      localStorage.setItem("watchlist", newList.toString());
      window.location.reload();
    }
  };