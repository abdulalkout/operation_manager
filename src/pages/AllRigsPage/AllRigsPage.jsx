import React from "react";
import "./AllRigsPage.css";
import { useEffect, useState, useContext } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import { ApiContext } from "../../context/ApiContext";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";
import AddRigForm from "../../components/AddRigForm/AddRigForm";

function AllRigsPage({ user, setUser }) {
  const [addNewRig, setAddNewRig] = useState(false);
  const { allRigs, refresh, setRefresh } = useContext(ApiContext);

  const addRigForm = () => {
    return (
      <div>
        <div className="add-form">
          <AddRigForm />
        </div>
        <button
          onClick={() => {
            setAddNewRig(false);
          }}
        >
          returen to all Rigs
        </button>
      </div>
    );
  };
  return (
    <div className="allRigs-div">
      <OpNavbar user={user} setUser={setUser} />
      {addNewRig ? (
        addRigForm()
      ) : (
        <div>
          <DataComponentsList allData={allRigs} setRefresh={setRefresh} />
          <button onClick={() => setAddNewRig(true)}>Add new well</button>
        </div>
      )}
    </div>
  );
}

export default AllRigsPage;
