import React, { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { Pie } from "react-chartjs-2";
import { Chart, Title, Tooltip, Legend, ArcElement } from "chart.js/auto"; // Import from 'chart.js/auto' to avoid manual component registration

const FieldGraphs = () => {
  const { allWells, refresh } = useContext(ApiContext);

  if (!allWells) {
    return <div>No production data available</div>;
  }

  // Extract unique field names
  const uniqueFields = [...new Set(allWells.map((well) => well.field))];

  // Sum production for each field
  const fieldProduction = uniqueFields.map((field) => {
    const totalProduction = allWells
      .filter((well) => well.field === field)
      .reduce(
        (sum, well) =>
          well.operationActivities.reduce(
            (fieldSum, activity) => fieldSum + activity.production,
            0
          ),
        0
      );

    return {
      field,
      totalProduction,
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.7)`,
      borderColor: `rgba(255, 255, 255, 1)`,
      borderWidth: 1,
    };
  });

  const data = {
    labels: fieldProduction.map((field) => field.field),
    datasets: [
      {
        data: fieldProduction.map((field) => field.totalProduction),
        backgroundColor: fieldProduction.map((field) => field.backgroundColor),
        borderColor: fieldProduction.map((field) => field.borderColor),
        borderWidth: fieldProduction.map((field) => field.borderWidth),
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
        text: "Fields Production Pie Chart",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default FieldGraphs;
