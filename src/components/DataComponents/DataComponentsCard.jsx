import React from "react";
import "./DataComponents.css";

function DataComponentsCard({ dataItem }) {
  return (
    <div className="item-card">
      <p>{dataItem.name}</p>
      <p>{dataItem.field}</p>
      <p>{dataItem.status}</p>
    </div>
  );
}

export default DataComponentsCard;
