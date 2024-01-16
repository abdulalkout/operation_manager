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

  return (
    <>
      {wellData.type === "Well" ? (
        <div className="allwells-div">
          <OpNavbar user={user} setUser={setUser} />
          <div className="show-div">
            <div className="well-details-div">
              <h2>Well Name: {wellData.name}</h2>
              <h2>Field Name: {wellData.field}</h2>
              <h2>
                Location:
                {wellData.location.map((loc, i) => {
                  return <h5 key={i}>{loc}</h5>;
                })}
              </h2>
              <h2>Status: {wellData.status}</h2>
              <h2>Operation: {wellData.operation}</h2>
              <h2>Rig: {rigData ? rigData.name : "No Rig"}</h2>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default WellDetailPage;
