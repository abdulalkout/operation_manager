import React, { useState, useEffect } from "react";
import "./AddWellForm.css"; // Add your styling if needed
import { addWell } from "../../utilities/wells-api";
import * as RigsAPI from "../../utilities/rigs-api";

function AddWellForm() {
  const initialWellState = {
    name: "",
    field: "",
    longitude: 0,
    latitude: 0,
    status: "Working",
    operation: "Production",
    rig: "",
  };

  const [newWell, setNewWell] = useState(initialWellState);
  const [allRigs, setAllRigs] = useState([]);

  useEffect(() => {
    async function getRigs() {
      try {
        const rigs = await RigsAPI.getAll();
        setAllRigs(rigs);
      } catch (error) {
        console.log("Error fetching rigs:", error.message);
      }
    }
    getRigs();
  }, []);

  const handleChange = (evt) => {
    setNewWell({ ...newWell, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setNewWell(initialWellState);
    try {
      const formData = { ...newWell };
      const well = await addWell(formData);
      console.log(well);
    } catch (error) {
      console.log("adding well field", error.message);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="well-form">
      <label>Well Name:</label>
      <input
        type="text"
        name="name"
        value={newWell.name}
        onChange={handleChange}
        required
      />

      <label>Field:</label>
      <input
        type="text"
        name="field"
        value={newWell.field}
        onChange={handleChange}
        required
      />

      <label>Latitude:</label>
      <input
        type="number"
        name="latitude"
        value={newWell.latitude}
        onChange={handleChange}
        required
      />

      <label>Longitude:</label>
      <input
        type="number"
        name="longitude"
        value={newWell.longitude}
        onChange={handleChange}
        required
      />

      <label>Status:</label>
      <select
        name="status"
        value={newWell.status}
        onChange={handleChange}
        required
      >
        <option value="Working">Working</option>
        <option value="Standby">Standby</option>
      </select>

      <label>Operation:</label>
      <select
        name="operation"
        value={newWell.operation}
        onChange={handleChange}
        required
      >
        <option value="Production">Production</option>
        <option value="Development">Development</option>
      </select>

      <label>Rig:</label>
      <select name="rig" value={newWell.rig} onChange={handleChange} required>
        <option value="" disabled>
          Select Rig
        </option>
        {allRigs.map((rig) => (
          <option key={rig._id} value={rig._id}>
            {rig.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Well</button>
    </form>
  );
}

export default AddWellForm;
