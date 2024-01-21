import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WellProductionPerName = ({ productionData }) => {
  if (!productionData || !productionData.productionTime) {
    return <div>No production data available</div>;
  }

  const labels = productionData.productionTime.map(
    (activity) => activity.createdAt
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Production",
        data: productionData.productionData.map(
          (activity) => activity.production
        ),
        borderColor: "rgb(255, 99, 132)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Well Production Chart",
      },
    },
    scales: {
      x: {
        type: "category",
        labels,
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
    height: 100,
  };

  return <Line data={data} options={options} />;
};

export default WellProductionPerName;
