import React, { useState, useEffect } from "react";
import "./AddRigForm.css"; // Add your styling if needed
import { addRig } from "../../utilities/rigs-api"; // Adjust the import to match your API
import * as wllsAPI from "../../utilities/wells-api";
import { userLogs } from "../../utilities/users-api";

function AddRigForm({ setAddNewRig, user }) {
  const initialRigState = {
    name: "",
    well: "",
    type: "Rig",
    status: "Working",
  };

  const [newRig, setNewRig] = useState(initialRigState);
  const [allWells, setAllWells] = useState([]);

  const LogsFromUser = async (rig) => {
    try {
      const log = {
        name: `Add Well: ${rig.name}`,
        activity: `Created a new Rig: ${rig.name}, With type of ${rig.type}, And It is ${rig.status}`,
        id: user._id,
      };

      const logsReseved = await userLogs(log);
      console.log(logsReseved);
    } catch (error) {
      console.error("Error updating user logs:", error.message);
    }
  };

  useEffect(() => {
    async function getWells() {
      try {
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
      // console.log(rig);
      LogsFromUser(rig);
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
      <button
        id="back-button"
        onClick={() => {
          setAddNewRig(false);
        }}
      >
        <i class="fa-solid fa-backward-step"></i> Back
      </button>
    </form>
  );
}

export default AddRigForm;
