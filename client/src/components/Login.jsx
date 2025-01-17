import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://worko-task-referral-management.onrender.com/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
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
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
