import React from "react";
import { useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import * as wllsAPI from "../../utilities/wells-api";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";

function DevelopmentWells({ user, setUser }) {
  const [allWells, setAllWells] = useState([]);
  const [productionWells, setProductionWells] = useState([]);
  const [developmentWells, setDevelopmentWells] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const wells = await wllsAPI.getAll();
        setAllWells(wells);
      } catch (error) {
        console.error("Error fetching all wells:", error);
      }
      try {
        const wells = await wllsAPI.getProductionWells();
        setProductionWells(wells);
      } catch (error) {
        console.error("Error fetching production wells:", error);
      }
      try {
        const wells = await wllsAPI.getDevelopmentWells();
        setDevelopmentWells(wells);
      } catch (error) {
        console.error("Error fetching dev wells:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="allwells-div">
      <OpNavbar user={user} setUser={setUser} />
      <div>
        <DataComponentsList allData={allWells} />
      </div>
    </div>
  );
}

export default DevelopmentWells;
