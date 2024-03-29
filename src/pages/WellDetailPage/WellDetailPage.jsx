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
  const [fileUploaded, setFileUploaded] = useState();

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

  const editWell = async (formData) => {
    try {
      await wllsAPI.editWell(formData);
      const updatedWell = await wllsAPI.getById(id);
      setWellData(updatedWell);
    } catch (error) {
      console.log("Edit well failed", error.message);
    }
  };

  const handleChange = async (evt, i) => {
    const updatedActivityData = [...activityData];
    updatedActivityData[i] = {
      ...updatedActivityData[i],
      [evt.target.name]: evt.target.value,
    };
    setActivityData(updatedActivityData);
    const wellId = wellData._id;

    try {
      await wllsAPI.editWellActivity(wellId, updatedActivityData);
    } catch (error) {
      console.error("Error editing well activity frontend:", error.message);
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
              {edit ? (
                <div className="operation-activity-header">
                  <p>{activity.name}</p>
                  <p>{activity.status}</p>
                  <p>{activity.request}</p>
                </div>
              ) : (
                <div className="operation-activity-header">
                  <p>{activity.name}</p>
                  <select
                    id="status"
                    name="status"
                    value={activity.status}
                    onChange={(evt) => handleChange(evt, i)}
                    required
                  >
                    <option value="" disabled>
                      Select Request
                    </option>
                    <option value="Planned">Planned</option>
                    <option value="On-going">On-going</option>
                    <option value="Finished">Finished</option>
                  </select>
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
                    {user.position === "Maneger" ? (
                      <option value="Approved">Approved</option>
                    ) : null}
                    <option value="Pending">Pending</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>
              )}

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
        <button className="edit-butoons" onClick={changeEdit}>
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
    );
  };

  const addActivity = () => {
    return (
      <>
        <OperationActivityForm
          user={user}
          wellData={wellData}
          onSubmit={editWell}
        />
        <button className="edit-butoons" onClick={() => setNewActivity(false)}>
          <i className="fa-solid fa-backward-step"> </i>
        </button>
      </>
    );
  };

  const handleChangefile = (e) => {
    const fileData = new FormData();
    fileData.append("file", e.target.files[0]);
    setFileUploaded(fileData);
  };

  const sendFile = async () => {
    try {
      console.log("file", fileUploaded);
      // Add any additional data to the form data if needed
      fileUploaded.append("additionalData", wellData);

      // Send the file to the backend
      await wllsAPI.addFile(fileUploaded);
    } catch (error) {
      console.error("Error adding file:", error.message);
    }
  };

  useEffect(() => {
    console.log("file", fileUploaded);
  }, [fileUploaded]);

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
                      <button className="show-butoons">
                        <i className="fa-regular fa-eye"></i>
                      </button>
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
                  <button
                    className="edit-butoons"
                    onClick={() => setNewActivity(true)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="edit-butoons" onClick={downloadAsPDF}>
                    <i className="fa-solid fa-file-arrow-down"></i>
                  </button>
                  {/* <input type="file" onChange={handleChangefile} />
                  <button onClick={sendFile}>upload File</button> */}
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
