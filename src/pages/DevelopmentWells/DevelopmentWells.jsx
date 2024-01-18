import React from "react";
import { useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import * as wllsAPI from "../../utilities/wells-api";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";

function DevelopmentWells({ user, setUser }) {
  const [developmentWells, setDevelopmentWells] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const wells = await wllsAPI.getDevelopmentWells();
        setDevelopmentWells(wells);
      } catch (error) {
        console.error("Error fetching dev wells:", error);
      }
    }

    fetchData();
  }, [refresh]);

  return (
    <div className="allwells-div">
      <OpNavbar user={user} setUser={setUser} />
      <div>
        <DataComponentsList
          allData={developmentWells}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
}

export default DevelopmentWells;
