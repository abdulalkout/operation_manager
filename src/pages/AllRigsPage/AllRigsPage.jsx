import React from "react";
import "./AllRigsPage.css";
import { useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import * as RigsAPI from "../../utilities/rigs-api";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";

function AllRigsPage() {
  const [allRigs, setAllRigs] = useState([]);
  useEffect(() => {
    async function getRigs() {
      const rigs = await RigsAPI.getAll();
      setAllRigs(rigs);
    }
    getRigs();
    console.log(allRigs);
  }, []);
  return (
    <div className="allRigs-div">
      <OpNavbar user={user} setUser={setUser} />
      <div>
        <DataComponentsList allData={allRigs} />
      </div>
    </div>
  );
}

export default AllRigsPage;
