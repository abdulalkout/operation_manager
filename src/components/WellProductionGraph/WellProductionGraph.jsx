import React from "react";
import { Line } from "react-chartjs-2";

const WellProductionGraph = ({ productionData }) => {
  const data = {
    labels: productionData.map((activity) => activity.submittedAt),
    datasets: [
      {
        label: "Production",
        data: productionData.map((activity) => activity.production),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default WellProductionGraph;
