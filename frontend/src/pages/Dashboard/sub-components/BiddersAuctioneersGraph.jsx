import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "rgb(99, 102, 241)",
        pointBorderColor: "rgb(255, 255, 255)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "rgb(236, 72, 153)",
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "rgb(236, 72, 153)",
        pointBorderColor: "rgb(255, 255, 255)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgb(156, 163, 175)",
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgb(156, 163, 175)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "rgb(156, 163, 175)",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        titleColor: "rgb(255, 255, 255)",
        bodyColor: "rgb(255, 255, 255)",
        borderColor: "rgba(99, 102, 241, 0.5)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="h-[400px] w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;