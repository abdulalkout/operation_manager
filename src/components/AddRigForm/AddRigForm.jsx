import React, { useState, useEffect } from "react";
import "./AddRigForm.css"; // Add your styling if needed
import { addRig } from "../../utilities/rigs-api"; // Adjust the import to match your API
import * as wllsAPI from "../../utilities/wells-api";

function AddRigForm() {
  const initialRigState = {
    name: "",
    well: "", // Assuming this is the well ID, modify as needed
    type: "Rig",
    status: "Working",
  };

  const [newRig, setNewRig] = useState(initialRigState);
  const [allWells, setAllWells] = useState([]);

  useEffect(() => {
    async function getWells() {
      try {
        // Assuming wllsAPI.getAll() is your method to fetch wells
        const wells = await wllsAPI.getAll();
        setAllWells(wells);
      } catch (error) {
        console.error("Error fetching all wells:", error);
      }
    }
    getWells();
  }, []);

  const handleChange = (evt) => {
    setNewRig({ ...newRig, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setNewRig(initialRigState);
    try {
      const formData = { ...newRig };
      const rig = await addRig(formData);
      console.log(rig);
    } catch (error) {
      console.log("Adding rig failed", error.message);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="rig-form">
      <label>Rig Name:</label>
      <input
        type="text"
        name="name"
        value={newRig.name}
        onChange={handleChange}
        required
      />

      <label>Associated Well:</label>
      <select name="well" value={newRig.well} onChange={handleChange} required>
        <option value="" disabled>
          Select Well
        </option>
        {allWells.map((well) => (
          <option key={well._id} value={well._id}>
            {well.name}
          </option>
        ))}
      </select>

      <label>Rig Type:</label>
      <select name="type" value={newRig.type} onChange={handleChange} required>
        <option value="Rig">Rig</option>
        <option value="Workover">Workover</option>
        <option value="Rigless">Rigless</option>
      </select>

      <label>Rig Status:</label>
      <select
        name="status"
        value={newRig.status}
        onChange={handleChange}
        required
      >
        <option value="Working">Working</option>
        <option value="Standby">Standby</option>
        <option value="Rigless">Rigless</option>
      </select>

      <button type="submit">Add Rig</button>
    </form>
  );
}

export default AddRigForm;
