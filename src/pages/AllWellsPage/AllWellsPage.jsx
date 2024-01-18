import React from "react";
import "./AllWellsPage.css";
import { useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import * as wllsAPI from "../../utilities/wells-api";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";
import AddWellForm from "../../components/AddWellForm/AddWellForm";
import OperationActivityForm from "../../components/OperationActivityForm/OperationActivityForm";

function AllWellsPage({ user, setUser }) {
  const [allWells, setAllWells] = useState([]);
  const [addNewWell, setAddNewWell] = useState(false);
  // const [newWell, setNewWell] = useState();
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  const addWellForm = () => {
    return (
      <div>
        <div className="add-form">
          <AddWellForm />
          {/* <OperationActivityForm /> */}
        </div>
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
          <DataComponentsList allData={allWells} setRefresh={setRefresh} />
          <button onClick={() => setAddNewWell(true)}>Add new well</button>
        </div>
      )}
    </div>
  );
}

export default AllWellsPage;
