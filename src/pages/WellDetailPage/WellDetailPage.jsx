import React, { useEffect, useState } from "react";
import "./WellDetailPage.css";
import { useParams } from "react-router-dom";
import * as wllsAPI from "../../utilities/wells-api";
import * as rigsAPI from "../../utilities/rigs-api";
import OpNavbar from "../../components/OpNavbar/OpNavbar";

function WellDetailPage({ user, setUser }) {
  const { id } = useParams();
  const [wellData, setWellData] = useState({});
  const [rigData, setRigData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const foundWell = await wllsAPI.getById(id);
        setWellData(foundWell);

        if (foundWell.rig) {
          const foundRig = await rigsAPI.getRigById(foundWell.rig);
          setRigData(foundRig);
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
            <div>
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
                  Lat: {wellData.location[0]}, Long: {wellData.location[1]}
                </p>
                <p>Operation: {wellData.operation}</p>
                <div>
                  <p>
                    Rig: {rigData ? rigData.name : "Rigless"}
                    <button className="rig-button">Show Rig</button>
                  </p>
                </div>
              </div>
            </div>
            <div>
              {wellData.operationActivities.length > 0 ? showActivity() : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default WellDetailPage;