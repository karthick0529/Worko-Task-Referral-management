import React from "react";

const CandidateCard = ({ candidate }) => {
  return (
    <div className="candidate-card">
      <h3>Name: {candidate.name}</h3>
      <p>Job Title: {candidate.jobTitle}</p>
      <p>Status: {candidate.status}</p>
    </div>
  );
};

export default CandidateCard;