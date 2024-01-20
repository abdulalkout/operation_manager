import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WellProductionPerName = ({ productionData }) => {
  if (!productionData || !productionData.productionTime) {
    // Handle the case when productionData is undefined or productionTime is not available
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
        backgroundColor: labels.map(
          () =>
            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
              Math.random() * 255
            }, 0.7)`
        ),
        borderWidth: 1,
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
  };

  return <Bar data={data} options={options} />;
};

export default WellProductionPerName;
