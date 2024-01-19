import React from "react";
import "./AllWellsPage.css";
import { useEffect, useState, useContext } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";
import AddWellForm from "../../components/AddWellForm/AddWellForm";
import { ApiContext } from "../../context/ApiContext";
import OperationActivityForm from "../../components/OperationActivityForm/OperationActivityForm";

function AllWellsPage({ user, setUser }) {
  const [addNewWell, setAddNewWell] = useState(false);
  const { allWells, setRefresh, refresh } = useContext(ApiContext);

  const addWellForm = () => {
    return (
      <div>
        <div className="add-form">
          <AddWellForm />
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
          <button className="add-new" onClick={() => setAddNewWell(true)}>
            <i class="fa-solid fa-plus"></i>
            {" Add new Well "}
            <i class="fa-solid fa-oil-well"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default AllWellsPage;
