import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CandidateCard from "./CandidateCard";
import UpdateStatus from "./UpdateStatus";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("https://worko-task-referral-management.onrender.com/candidates", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCandidates(data);
        setFilteredCandidates(data); // Initially display all candidates
      } catch (error) {
        alert("Failed to fetch candidates.");
      }
    };

    fetchCandidates();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleStatusUpdate = (candidateId, newStatus) => {
    // Update the status locally in both candidates and filteredCandidates
    setCandidates((prevCandidates) => {
      const updatedCandidates = prevCandidates.map((candidate) =>
        candidate._id === candidateId
          ? { ...candidate, status: newStatus }
          : candidate
      );
      setFilteredCandidates(updatedCandidates); // Update filteredCandidates
      return updatedCandidates; // Return updated candidates to trigger re-render
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter candidates based on job title or status
    const filtered = candidates.filter(
      (candidate) =>
        candidate.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
        candidate.status.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCandidates(filtered);
  };

  // Calculate statistics
  const totalCandidates = candidates.length;
  const statusCounts = candidates.reduce((acc, candidate) => {
    acc[candidate.status] = (acc[candidate.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#007bff",
          margin: "20px 0",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Candidate Referral Management System
      </h1>
      <div className="dashboard-container">
        <h2>Candidate Dashboard</h2>

        <div className="dashboard-actions-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Job Title or Status"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="dashboard-actions">
            <button onClick={() => handleNavigate("/refer")}>
              Refer a Candidate
            </button>
          </div>
        </div>

        {/* Display statistics */}
        <div className="statistics">
          <p>Total Candidates Referred: {totalCandidates}</p>
          <p>Pending: {statusCounts["Pending"] || 0}</p>
          <p>Reviewed: {statusCounts["Reviewed"] || 0}</p>
          <p>Hired: {statusCounts["Hired"] || 0}</p>
        </div>

        <div className="candidate-list">
          {filteredCandidates.map((candidate) => (
            <div key={candidate._id} className="candidate-card">
              <CandidateCard candidate={candidate} />
              {/* UpdateStatus now comes below CandidateCard */}
              <UpdateStatus
                candidateId={candidate._id}
                currentStatus={candidate.status}
                onStatusUpdate={handleStatusUpdate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
