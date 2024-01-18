import React, { createContext, useEffect, useState } from "react";
import * as wllsAPI from "../utilities/wells-api";
import * as RigsAPI from "../utilities/rigs-api";

export const ApiContext = createContext();

function ApiContextProvider(props) {
  const [allRigs, setAllRigs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [allWells, setAllWells] = useState([]);
  const [productionWells, setProductionWells] = useState([]);
  const [developmentWells, setDevelopmentWells] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const wells = await wllsAPI.getAll();
        setAllWells(wells);
      } catch (error) {
        console.error("Error fetching all wells:", error);
      }
    }
    async function getRigs() {
      const rigs = await RigsAPI.getAll();
      setAllRigs(rigs);
    }
    async function fetchProductionData() {
      try {
        const wells = await wllsAPI.getProductionWells();
        setProductionWells(wells);
      } catch (error) {
        console.error("Error fetching production wells:", error);
      }
    }
    async function fetchDevData() {
      try {
        const wells = await wllsAPI.getDevelopmentWells();
        setDevelopmentWells(wells);
      } catch (error) {
        console.error("Error fetching dev wells:", error);
      }
    }

    getRigs();
    fetchData();
    fetchProductionData();
    fetchDevData();
  }, [refresh]);

  return (
    <ApiContext.Provider
      value={{
        refresh,
        setRefresh,
        allWells,
        setAllWells,
        allRigs,
        setAllRigs,
        setProductionWells,
        productionWells,
        developmentWells,
        setDevelopmentWells,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}

export default ApiContextProvider;
