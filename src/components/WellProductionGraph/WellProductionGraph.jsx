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
// import faker from "faker";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WellProductionGraph = ({ productionData }) => {
  const labels = productionData.map((well) => well.wellName);

  const data = {
    labels,
    datasets: [
      {
        label: "Production",
        data: productionData.map((well) =>
          well.productionData.reduce(
            (sum, activity) => sum + activity.production,
            0
          )
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

export default WellProductionGraph;
