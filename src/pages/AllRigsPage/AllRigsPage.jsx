import React from "react";
import "./AllRigsPage.css";
import { useEffect, useState } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import * as RigsAPI from "../../utilities/rigs-api";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";
import AddRigForm from "../../components/AddRigForm/AddRigForm";

function AllRigsPage({ user, setUser }) {
  const [allRigs, setAllRigs] = useState([]);
  const [addNewRig, setAddNewRig] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function getRigs() {
      const rigs = await RigsAPI.getAll();
      setAllRigs(rigs);
    }
    getRigs();
    console.log(allRigs);
  }, [refresh]);

  const addRigForm = () => {
    return (
      <div>
        <div className="add-form">
          <AddRigForm />
          {/* <OperationActivityForm /> */}
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
