import React from "react";
import { useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import * as wllsAPI from "../../utilities/wells-api";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";

function ProductionWells({ user, setUser }) {
  const [productionWells, setProductionWells] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const wells = await wllsAPI.getProductionWells();
        setProductionWells(wells);
      } catch (error) {
        console.error("Error fetching production wells:", error);
      }
    }
    console.log(productionWells);
    fetchData();
  }, []);

  return (
    <div className="allwells-div">
      <OpNavbar user={user} setUser={setUser} />
      <div>
        <DataComponentsList allData={productionWells} />
      </div>
    </div>
  );
}

export default ProductionWells;
