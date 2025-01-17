import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    resume: null,
  });
  const [error, setError] = useState(""); // To handle validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset error when user starts typing
    if (name === "phone") {
      setError("");
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^[0-9]{10}$/; // Phone number should be exactly 10 digits
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/candidates", formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Candidate referred successfully");
      navigate("/dashboard"); // Navigate back to dashboard after successful submission
    } catch (error) {
      alert(
        "Failed to refer candidate, please try again with valid credentials"
      );
    }
  };

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
      <div className="referral-form-container">
        <h2>Refer a Candidate</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone (10 digits)"
            type="tel"
            onChange={handleChange}
            required
          />
          {/* Display error message for invalid phone number */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            name="jobTitle"
            placeholder="Job Title"
            onChange={handleChange}
            required
          />
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReferralForm;
