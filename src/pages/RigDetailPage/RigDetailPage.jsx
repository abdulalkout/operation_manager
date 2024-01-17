import React from "react";
import "./RigDetailPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as wllsAPI from "../../utilities/wells-api";
import * as rigsAPI from "../../utilities/rigs-api";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import { Link } from "react-router-dom";

function RigDetailPage({ user, setUser }) {
  const { id } = useParams();
  const [wellData, setWellData] = useState({});
  const [rigData, setRigData] = useState({});

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
            console.log("Well data was not fetched", error.messege);
          }
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }
    fetchData();
  }, [id]);

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
                    <button className="rig-button">Show Well</button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RigDetailPage;
