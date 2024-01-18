import React from "react";
import { useContext } from "react";
import OpNavbar from "../../components/OpNavbar/OpNavbar";
import { ApiContext } from "../../context/ApiContext";
import DataComponentsList from "../../components/DataComponents/DataComponentsList";

function ProductionWells({ user, setUser }) {
  const { productionWells, setRefresh } = useContext(ApiContext);

  return (
    <div className="allwells-div">
      <OpNavbar user={user} setUser={setUser} />
      <div>
        <DataComponentsList allData={productionWells} setRefresh={setRefresh} />
      </div>
    </div>
  );
}

export default ProductionWells;
