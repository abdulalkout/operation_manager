import React from "react";
import "./WellDetailPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as wllsAPI from "../../utilities/wells-api";
import OpNavbar from "../../components/OpNavbar/OpNavbar";

function WellDetailPage({ user, setUser }) {
  const { id } = useParams();
  const [wellData, setWellData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const foundWell = await wllsAPI.getById(id);
        setWellData(foundWell);
      } catch (error) {
        console.error("Error fetching all wells:", error);
      }
    }
    fetchData();
    console.log(wellData);
  }, []);

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
                  return <h5>{loc}</h5>;
                })}
              </h2>
              <h2>Status: {wellData.status}</h2>
              <h2>Operation: {wellData.operation}</h2>
              <h2>Rig: {wellData.rig}</h2>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default WellDetailPage;
