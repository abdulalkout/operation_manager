import React, { useEffect, useState } from "react";
import "./WellDetailPage.css";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";
import * as wllsAPI from "../../utilities/wells-api";
import * as rigsAPI from "../../utilities/rigs-api";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import OperationActivityForm from "../../components/OperationActivityForm/OperationActivityForm";
import { Link } from "react-router-dom";

function WellDetailPage({ user, setUser }) {
  const { id } = useParams();
  const [wellData, setWellData] = useState({});
  const [rigData, setRigData] = useState(null);
  const [newActivity, setNewActivity] = useState(false);

  const downloadAsPDF = () => {
    const element = document.querySelector(".show-div");
    html2pdf(element);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const foundWell = await wllsAPI.getById(id);
        setWellData(foundWell);

        if (foundWell.rig) {
          try {
            const foundRig = await rigsAPI.getRigById(foundWell.rig);
            setRigData(foundRig);
          } catch (error) {
            console.log("Rig data was not fetched", error.messege);
          }
        }
      } catch (error) {
        console.error("Error fetching well details:", error);
      }
    }
    fetchData();
    console.log(rigData);
  }, [id]);

  const showActivity = () => {
    return (
      <div className="activity-div">
        {wellData.operationActivities.map((activity, i) => {
          return (
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
              <p>Production: {activity.production} ppg</p>
            </div>
          );
        })}
      </div>
    );
  };

  const editWell = async (formData) => {
    try {
      await wllsAPI.editWell(formData);
      const updatedWell = await wllsAPI.getById(id);
      setWellData(updatedWell);
    } catch (error) {
      console.log("Edit well failed", error.message);
    }
  };

  const addActivity = () => {
    return (
      <>
        <OperationActivityForm wellData={wellData} onSubmit={editWell} />
        <button onClick={() => setNewActivity(false)}>back</button>
      </>
    );
  };

  return (
    <>
      {wellData.type === "Well" ? (
        <div className="allwells-div">
          <OpNavbar user={user} setUser={setUser} />
          <div className="show-div">
            <div className="well-details-div">
              <div>
                <p>Well Name: {wellData.name}</p>
                <p>Field Name: {wellData.field}</p>
                <p>Status: {wellData.status}</p>
              </div>
              <div>
                <p>
                  Lat: {wellData.latitude}, Long: {wellData.longitude}
                </p>
                <p>Operation: {wellData.operation}</p>
                <div>
                  <p>
                    Rig: {rigData ? rigData.name : "Rigless"}
                    <Link to={`/rig/${wellData.rig}`}>
                      <button className="rig-button">Show Rig</button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div>
              {wellData.operationActivities.length > 0 ? showActivity() : null}
              {newActivity ? (
                addActivity()
              ) : (
                <div>
                  <button onClick={() => setNewActivity(true)}>
                    Add OP Activity
                  </button>
                  <button onClick={downloadAsPDF}>Download as PDF</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default WellDetailPage;
