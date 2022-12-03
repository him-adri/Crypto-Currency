import { getDateArray } from "./getDateArray";

export const setChartDataFunction = (setChartData, prices) => {
    setChartData({
        labels: prices?.map((data) => getDateArray(data[0])),
        datasets: [
          {
            label: "Price",
            data: prices?.map((data) => data[1]),
            borderWidth: 1,
            fill: false,
            tension: 0.25,
            backgroundColor: "transparent",
            borderColor: "#888",
            pointRadius: 0,
          },
        ],
      });
}