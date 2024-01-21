import React, { useEffect, useState, useContext } from "react";
import "./WellDetailPage.css";
import { ApiContext } from "../../context/ApiContext";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";
import * as wllsAPI from "../../utilities/wells-api";
import * as rigsAPI from "../../utilities/rigs-api";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import OperationActivityForm from "../../components/OperationActivityForm/OperationActivityForm";
import { Link } from "react-router-dom";
import WellProductionPerName from "../../components/WellProductionGraph/WellProductionPerName";
import * as wellService from "../../utilities/well-service";

function WellDetailPage({ user, setUser }) {
  const { id } = useParams();
  const [wellData, setWellData] = useState({});
  const [rigData, setRigData] = useState(null);
  const [newActivity, setNewActivity] = useState(false);
  const [wellProduction, setWellProduction] = useState();
  const [sumProduction, setSumProduction] = useState();
  const [edit, setEdit] = useState(true);
  const { reloadPage } = useContext(ApiContext);

  const [activityData, setActivityData] = useState([]);

  const downloadAsPDF = () => {
    const element = document.querySelector(".show-div");
    html2pdf(element);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const foundWell = await wllsAPI.getById(id);
        setWellData(foundWell);
        setActivityData(foundWell.operationActivities);
        if (foundWell.rig) {
          try {
            const foundRig = await rigsAPI.getRigById(foundWell.rig);
            setRigData(foundRig);
          } catch (error) {
            console.log("Rig data was not fetched", error.message);
          }
        }
        // brig well data using well-service functions
        const wellproduction = await wellService.getWellProductionData(
          foundWell
        );
        setWellProduction(wellproduction);
        const sum = wellService.sumProduction(foundWell);
        setSumProduction(sum);
      } catch (error) {
        console.error("Error fetching well details:", error);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = async (evt, i) => {
    const updatedActivityData = [...activityData];
    updatedActivityData[i] = {
      ...updatedActivityData[i],
      [evt.target.name]: evt.target.value,
    };
    // Update the state with the new array
    setActivityData(updatedActivityData);
    // console.log(updatedActivityData);
    const wellId = wellData._id;

    try {
      await wllsAPI.editWellActivity(wellId, updatedActivityData);
    } catch (error) {
      console.error("Error editing well activity:", error.message);
    }

    reloadPage();
    changeEdit();
  };

  const changeEdit = () => {
    setEdit(!edit);
  };

  const showActivity = () => {
    return (
      <div className="activity-div">
        {wellData.operationActivities.map((activity, i) => {
          return (
            <div key={i}>
              <div className="operation-activity-header">
                <p>{activity.name}</p>
                <p>{activity.status}</p>
                <div>
                  {edit ? (
                    <p>{activity.request}</p>
                  ) : (
                    <>
                      <select
                        id="request"
                        name="request"
                        value={activity.request}
                        onChange={(evt) => handleChange(evt, i)}
                        required
                      >
                        <option value="" disabled>
                          Select Request
                        </option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Declined">Declined</option>
                      </select>
                    </>
                  )}
                </div>
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
        <button onClick={changeEdit}>
          <i class="fa-solid fa-pencil"></i>
        </button>
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
        <button className="" onClick={() => setNewActivity(false)}>
          <i className="fa-solid fa-backward-step"> </i> Back
        </button>
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
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button onClick={downloadAsPDF}>
                    <i className="fa-solid fa-file-arrow-down"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="production-graph">
            <WellProductionPerName productionData={wellProduction} />
            <p className="sum-paragraph">
              Sum of well production: {sumProduction} ppg
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default WellDetailPage;
