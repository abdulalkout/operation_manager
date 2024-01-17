import React, { useState } from "react";
import "./OperationActivityForm.css";

function OperationActivityForm() {
  const [activityData, setActivityData] = useState({
    name: "",
    status: "",
    operationText: "",
    request: "",
    requester: "",
    approval: "",
    production: "",
  });

  const handleChange = (evt) => {
    setActivityData({ ...activityData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Add your logic to handle form submission
    console.log(activityData);
  };

  return (
    <div className="activity-form">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Name: </label>
        <br />
        <input
          type="text"
          name="name"
          value={activityData.name}
          onChange={handleChange}
          required
        />

        <label>Status: </label>
        <input
          type="text"
          name="status"
          value={activityData.status}
          onChange={handleChange}
          required
        />

        <label>Operation Text</label>
        <textarea
          name="operationText"
          value={activityData.operationText}
          onChange={handleChange}
          rows="6"
          required
        ></textarea>

        <label>Request</label>
        <input
          type="text"
          name="request"
          value={activityData.request}
          onChange={handleChange}
          required
        />

        <label>Requester</label>
        <input
          type="text"
          name="requester"
          value={activityData.requester}
          onChange={handleChange}
          required
        />

        <label>Approval</label>
        <input
          type="text"
          name="approval"
          value={activityData.approval}
          onChange={handleChange}
          required
        />

        <label>Production</label>
        <input
          type="text"
          name="production"
          value={activityData.production}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OperationActivityForm;
