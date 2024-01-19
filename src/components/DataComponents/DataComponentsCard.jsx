import React from "react";
import "./DataComponents.css";
import { Link } from "react-router-dom";
import * as wellsAPI from "../../utilities/wells-api";
import * as rigsAPI from "../../utilities/rigs-api";

function DataComponentsCard({ dataItem, setRefresh }) {
  const rigPic =
    "https://icon-library.com/images/drilling-rig-icon/drilling-rig-icon-12.jpg";

  const wellPic =
    "https://media.istockphoto.com/id/1183765946/vector/oil-derrick-well-pump-monochrome-icon.jpg?s=612x612&w=0&k=20&c=cBZVgPl01DJm6egVsj4-S5_nGZrIztbSa606pxOGM7g=";

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
          <button className="show-butoon">
            <i class="fa-solid fa-eye"></i>
          </button>
        </Link>
        <button className="delete-button" onClick={deleteOneWell}>
          <i class="fa-solid fa-trash"></i>
        </button>
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
          <button className="show-butoon">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button className="delete-button" onClick={deleteOneRig}>
            <i class="fa-solid fa-trash"></i>
          </button>
        </Link>
      </div>
    );
  };

  return <div>{dataItem.type == "Well" ? allwell() : allRig()}</div>;
}

export default DataComponentsCard;
