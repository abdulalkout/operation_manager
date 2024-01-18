import React from "react";
import "./DataComponents.css";
import { Link } from "react-router-dom";
import * as wellsAPI from "../../utilities/wells-api";
import * as rigsAPI from "../../utilities/rigs-api";

function DataComponentsCard({ dataItem, setRefresh }) {
  const rigPic =
    "https://www.lassarat.com/wp-content/uploads/2019/07/Pictos-08.png";

  const wellPic =
    "https://jrq.gsv.mybluehost.me/wp-content/uploads/2023/07/hydrocarbons-1.png";

  const deleteOneWell = async () => {
    try {
      await wellsAPI.deleteWell(dataItem._id);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("Delete well failed", error.message);
    }
  };

  const deleteOneRig = async () => {
    try {
      await rigsAPI.deleteRig(dataItem._id);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("Delete rig failed", error.message);
    }
  };

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
        <button onClick={deleteOneWell}>Delete</button>
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
          <button onClick={deleteOneRig}>Delete</button>
        </Link>
      </div>
    );
  };

  return <div>{dataItem.type == "Well" ? allwell() : allRig()}</div>;
}

export default DataComponentsCard;
