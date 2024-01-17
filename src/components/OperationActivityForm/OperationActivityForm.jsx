import React, { useState } from "react";
import "./OperationActivityForm.css";
import { editWell } from "../../utilities/wells-api";

function OperationActivityForm({ wellData, onSubmit }) {
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = {
        ...wellData,
        operationActivities: [...wellData.operationActivities, activityData],
      };
      await onSubmit(formData);
      setActivityData({
        name: "",
        status: "",
        operationText: "",
        request: "",
        requester: "",
        approval: "",
        production: "",
      });
    } catch (error) {
      console.log("Edit well failed", error.message);
    }
  };

  return (
    <div className="activity-form">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="input-div">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={activityData.name}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={activityData.status}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="input-div">
          <label htmlFor="request">Request:</label>
          <select
            id="request"
            name="request"
            value={activityData.request}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Request
            </option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
          </select>
          <br />
          <label htmlFor="requester">Requester:</label>
          <input
            type="text"
            id="requester"
            name="requester"
            value={activityData.requester}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="input-div">
          <label htmlFor="approval">Approval:</label>
          <input
            type="text"
            id="approval"
            name="approval"
            value={activityData.approval}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="production">Production:</label>
          <input
            type="text"
            id="production"
            name="production"
            value={activityData.production}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="input-div">
          <label htmlFor="operationText">Operation Activity:</label>
          <textarea
            id="operationText"
            name="operationText"
            placeholder="Enter Operation Activity..."
            value={activityData.operationText}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OperationActivityForm;
