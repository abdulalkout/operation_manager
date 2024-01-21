import React from "react";
import "./AllWellsPage.css";
import { useEffect, useState, useContext } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";
import AddWellForm from "../../components/AddWellForm/AddWellForm";
import { ApiContext } from "../../context/ApiContext";

function AllWellsPage({ user, setUser }) {
  const [addNewWell, setAddNewWell] = useState(false);
  const { allWells, setRefresh, refresh } = useContext(ApiContext);

  const addWellForm = () => {
    const imageForm =
      "https://media.istockphoto.com/id/516084779/vector/oil-industry-pump-jack-drawing.jpg?s=612x612&w=0&k=20&c=VyXVnv4tGUmY-4_ILrHXBRJdxxzpFriCTxv2P-XVt44=";
    return (
      <div className="adding-page">
        <div className="add-form">
          <AddWellForm />
          <button
            className="back-button"
            onClick={() => {
              setAddNewWell(false);
            }}
          >
            <i class="fa-solid fa-backward-step"></i> Back
          </button>
        </div>
        <img className="add-image" src={imageForm} alt="Adding Well" />
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
