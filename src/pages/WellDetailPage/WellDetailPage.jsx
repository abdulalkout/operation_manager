import React from "react";
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
  }, []);

  return (
    <div className="allwells-div">
      <OpNavbar user={user} setUser={setUser} />
      <div>
        <div>
          <h1>{wellData.name ? wellData.name : <>no data</>}</h1>
        </div>
      </div>
    </div>
  );
}

export default WellDetailPage;
