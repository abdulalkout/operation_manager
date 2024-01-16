import React from "react";
import "./DataComponents.css";
import DataComponentsCard from "./DataComponentsCard";

function DataComponentsList({ allData }) {
  return (
    <div className="item-list">
      {allData.map((dataItem, i) => {
        return (
          <div key={i}>
            <DataComponentsCard dataItem={dataItem} />
          </div>
        );
      })}
    </div>
  );
}

export default DataComponentsList;
