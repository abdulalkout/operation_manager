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
    const rigImg =
      "https://img.freepik.com/premium-photo/oil-rig-isolated-background-oil-industry-design_889761-2031.jpg";

    return (
      <div className="adding-page">
        <div className="add-form">
          <AddRigForm setAddNewRig={setAddNewRig} />
        </div>
        <img className="add-image" src={rigImg} />
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
          <button className="add-new" onClick={() => setAddNewRig(true)}>
            <i class="fa-solid fa-plus"></i>
            {" Add new Well "}
            <i class="fa-solid fa-oil-well"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default AllRigsPage;
