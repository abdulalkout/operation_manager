import React from "react";
import "./AllWellsPage.css";
import { useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import * as wllsAPI from "../../utilities/wells-api";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";

function AllWellsPage({ user, setUser }) {
  const [allWells, setAllWells] = useState([]);
  useEffect(() => {
    async function getWells() {
      const wells = await wllsAPI.getAll();
      setAllWells(wells);
    }
    getWells();
    console.log(allWells);
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

export default AllWellsPage;
