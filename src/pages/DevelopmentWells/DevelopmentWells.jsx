import React from "react";
import { useContext } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";
import { ApiContext } from "../../context/ApiContext";

function DevelopmentWells({ user, setUser }) {
  const { developmentWells, setRefresh } = useContext(ApiContext);

  return (
    <div className="allwells-div">
      <OpNavbar user={user} setUser={setUser} />
      <div>
        <DataComponentsList
          allData={developmentWells}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
}

export default DevelopmentWells;
