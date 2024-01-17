import React, { useState } from "react";
import "./AddWellForm.css"; // Add your styling if needed

function AddWellForm({ onAddWell }) {
  const initialWellState = {
    name: "",
    field: "",
    location: [],
    status: "Working",
    operation: "Production",
    rig: "", // Assume rig is assigned later, so an empty string for now
  };

  const [newWell, setNewWell] = useState(initialWellState);

  const handleChange = (evt) => {
    setNewWell({ ...newWell, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddWell(newWell); // Pass the new well data to the parent component
    setNewWell(initialWellState); // Reset form state after submission
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

      <label>Location:</label>
      <input
        type="text"
        name="location"
        value={newWell.location}
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
      <input
        type="text"
        name="rig"
        value={newWell.rig}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Well</button>
    </form>
  );
}

export default AddWellForm;
