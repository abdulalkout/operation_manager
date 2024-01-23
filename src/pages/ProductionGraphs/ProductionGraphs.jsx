// ProductionGraphs.js

import React, { useContext, useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import WellProductionGraph from "../../components/WellProductionGraph/WellProductionGraph";
import { ApiContext } from "../../context/ApiContext";
import { getAllWellsProductionData } from "../../utilities/wells-api";
import "./ProductionGraphs.css";
import FieldGraphs from "../../components/FieldGraphs/FieldGraphs";
import html2pdf from "html2pdf.js";

function ProductionGraphs({ user, setUser }) {
  const { allWells, refresh } = useContext(ApiContext);
  const [productionData, setProductionData] = useState([]);

  useEffect(() => {
    // Fetch production data for all wells
    async function fetchData() {
      try {
        const data = await getAllWellsProductionData();
        setProductionData(data);
      } catch (error) {
        console.error("Error fetching production data:", error);
      }
    }
    fetchData();
  }, [refresh]);

  const downloadAsPDF = () => {
    const element = document.querySelector(".graphs");
    html2pdf(element);
  };

  return (
    <>
      <div className="allwells-div">
        <OpNavbar user={user} setUser={setUser} />
        <div className="graphs">
          <div className="well-production-graph">
            <WellProductionGraph productionData={productionData} />
          </div>
          <div className="well-production-pie">
            <div className="graph-div">
              <FieldGraphs />
              <button className="edit-butoons" onClick={downloadAsPDF}>
                <i className="fa-solid fa-file-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductionGraphs;
