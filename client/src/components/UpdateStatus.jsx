import React, { useState } from "react";
import axios from "axios";

const UpdateStatus = ({ candidateId, currentStatus, onStatusUpdate }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await axios.put(
        `http://localhost:5000/candidates/${candidateId}/status`,
        {
          status: newStatus,
        }
      );

      // Call the parent component's function to update the UI
      if (onStatusUpdate) onStatusUpdate(candidateId, newStatus);

      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <label htmlFor={`status-${candidateId}`}>Update Status: </label>
      <select
        id={`status-${candidateId}`}
        value={status}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="Reviewed">Reviewed</option>
        <option value="Hired">Hired</option>
      </select>
    </div>
  );
};

export default UpdateStatus;
