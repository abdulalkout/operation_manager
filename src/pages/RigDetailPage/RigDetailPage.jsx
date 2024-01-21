// RigDetailPage.js
import React, { useState, useEffect } from "react";
import "./RigDetailPage.css";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";
import * as wllsAPI from "../../utilities/wells-api";
import * as rigsAPI from "../../utilities/rigs-api";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import { Link } from "react-router-dom";
import OperationActivityRigForm from "../../components/OperationActivityForm/OperationActivityRigForm";

function RigDetailPage({ user, setUser }) {
  const { id } = useParams();
  const [wellData, setWellData] = useState({});
  const [rigData, setRigData] = useState({});
  const [newActivity, setNewActivity] = useState(false);

  const downloadAsPDF = () => {
    const element = document.querySelector(".show-div");
    html2pdf(element);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const foundRig = await rigsAPI.getRigById(id);
        setRigData(foundRig);

        if (foundRig.well) {
          try {
            const foundWell = await wllsAPI.getById(foundRig.well);
            setWellData(foundWell);
          } catch (error) {
            console.log("Well data was not fetched", error.message);
          }
        }
      } catch (error) {
        console.error("Error fetching details:", error.message);
      }
    }
    fetchData();
  }, [id]);

  const showActivity = () => {
    return (
      <div className="activity-div">
        {rigData.operationActivities &&
        rigData.operationActivities.length > 0 ? (
          rigData.operationActivities.map((activity, i) => (
            <div key={i}>
              <div className="operation-activity-header">
                <p>{activity.name}</p>
                <p>{activity.status}</p>
                <p>{activity.request}</p>
              </div>
              <div className="operation-activity-body">
                <p>{activity.operationText}</p>
              </div>
              <div className="operation-activity-header">
                <p>Requested by: {activity.requester}</p>
                <p>Aproved by: {activity.approval}</p>
              </div>
              <p>Total Depth: {activity.production} ft</p>
            </div>
          ))
        ) : (
          <p>No activities available</p>
        )}
      </div>
    );
  };

  const editRig = async (formData) => {
    try {
      await rigsAPI.editRig(formData);
      const updatedRig = await rigsAPI.getRigById(id);
      setRigData(updatedRig);
    } catch (error) {
      console.log("Edit rig failed", error.message);
    }
  };

  const addActivity = () => {
    return (
      <>
        <OperationActivityRigForm rigData={rigData} onSubmit={editRig} />
        <button onClick={() => setNewActivity(false)}>Back</button>
      </>
    );
  };

  return (
    <>
      <div className="allwells-div">
        <OpNavbar user={user} setUser={setUser} />
        <div className="show-div">
          <div className="well-details-div">
            <div>
              <p>Well Name: {rigData.name}</p>
              <p>Status: {rigData.status}</p>
            </div>
            <div>
              <p>Type: {rigData.type}</p>
              <div>
                <p>
                  Well: {wellData ? wellData.name : "Stand alon"}
                  <Link to={`/well/${rigData.well}`}>
                    <button className="show-butoons">
                      <i className="fa-regular fa-eye"></i>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div>
            {showActivity()}
            {!newActivity && (
              <div>
                <button
                  className="edit-butoons"
                  onClick={() => setNewActivity(true)}
                >
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button className="edit-butoons" onClick={downloadAsPDF}>
                  <i class="fa-solid fa-file-arrow-down"></i>
                </button>
              </div>
            )}
            {newActivity && addActivity()}
          </div>
        </div>
      </div>
    </>
  );
}

export default RigDetailPage;
