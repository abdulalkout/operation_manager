import React from "react";
import { useState } from "react";
import "./DataComponents.css";

function DataComponentsCard({ dataItem }) {
  const [show, setShow] = useState(true);

  const rigPic =
    "https://www.lassarat.com/wp-content/uploads/2019/07/Pictos-08.png";

  const wellPic =
    "https://jrq.gsv.mybluehost.me/wp-content/uploads/2023/07/hydrocarbons-1.png";

  const allwell = () => {
    return (
      <div className="item-card">
        <img className="card-pics" src={wellPic} alt="RigPic" />
        <p>{dataItem.name}</p>
        <p>{dataItem.field ? dataItem.field : null}</p>
        <p>{dataItem.status}</p>
      </div>
    );
  };

  const showRig = () => {
    return (
      <div className="item-card">
        <img className="card-pics" src={rigPic} alt="RigPic" />
        <p>{dataItem.name}</p>
        <p>{dataItem.field ? dataItem.field : null}</p>
        <p>{dataItem.status}</p>
      </div>
    );
  };

  return (
    <div>{show & (dataItem.type == "Well") ? allwell("") : showRig()}</div>
  );
}

export default DataComponentsCard;
