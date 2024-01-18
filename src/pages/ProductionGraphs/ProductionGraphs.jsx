// ProductionGraphs.js

import React, { useContext, useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import WellProductionGraph from "../../components/WellProductionGraph/WellProductionGraph";
import { ApiContext } from "../../context/ApiContext";
import { getAllWellsProductionData } from "../../utilities/wells-api";

function ProductionGraphs({ user, setUser }) {
  const { allWells, refresh } = useContext(ApiContext);
  const [productionData, setProductionData] = useState([]);

  useEffect(() => {
    // Fetch production data for all wells
    async function fetchData() {
      try {
        const data = await getAllWellsProductionData();
        setProductionData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching production data:", error);
      }
    }
    fetchData();
  }, [refresh]);

  return (
    <div className="allwells-div">
      <OpNavbar user={user} setUser={setUser} />
      <div>
        <WellProductionGraph productionData={productionData} />
      </div>
    </div>
  );
}

export default ProductionGraphs;
