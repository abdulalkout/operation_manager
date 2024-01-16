import React from "react";
import "./DataComponents.css";
import { Link } from "react-router-dom";

function DataComponentsCard({ dataItem }) {
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
        <Link to={`/well/${dataItem._id}`}>
          <button>Show</button>
        </Link>
      </div>
    );
  };

  const allRig = () => {
    return (
      <div className="item-card">
        <img className="card-pics" src={rigPic} alt="RigPic" />
        <p>{dataItem.name}</p>
        <p>{dataItem.field ? dataItem.field : null}</p>
        <p>{dataItem.status}</p>
        <Link to={`/rig/${dataItem._id}`}>
          <button>Show</button>
        </Link>
      </div>
    );
  };

  return <div>{dataItem.type == "Well" ? allwell() : allRig()}</div>;
}

export default DataComponentsCard;
