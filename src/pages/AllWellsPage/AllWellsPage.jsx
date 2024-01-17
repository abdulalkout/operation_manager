import React from "react";
import "./AllWellsPage.css";
import { useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import * as wllsAPI from "../../utilities/wells-api";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";

function AllWellsPage({ user, setUser }) {
  const [allWells, setAllWells] = useState([]);
  const [addNewWell, setAddNewWell] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const wells = await wllsAPI.getAll();
        setAllWells(wells);
      } catch (error) {
        console.error("Error fetching all wells:", error);
      }
    }
    fetchData();
  }, []);

  const addWellForm = () => {
    return (
      <div>
        <button
          onClick={() => {
            setAddNewWell(false);
          }}
        >
          returen to all wells
        </button>
      </div>
    );
  };

  return (
    <div className="allwells-div">
      <OpNavbar user={user} setUser={setUser} />
      {addNewWell ? (
        addWellForm()
      ) : (
        <div>
          <DataComponentsList allData={allWells} />
          <button onClick={() => setAddNewWell(true)}>Add new well</button>
        </div>
      )}
    </div>
  );
}

export default AllWellsPage;
