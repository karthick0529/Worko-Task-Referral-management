import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ReferralForm from "./components/ReferralForm";
import "./App.css";

// Header Component
const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  const handleLogout = () => {
    // Clear the token or user data from localStorage
    localStorage.removeItem("token");
    alert("You have been logged out.");
    // Redirect to login page after logout
    navigate("/login");
  };

  // Check if the user is logged in (token exists)
  const isLoggedIn = localStorage.getItem("token");

  return (
    <header className="app-header">
      <nav>
        <ul className="menu">
          <li>
            <button onClick={() => handleNavigation("/")}>Home</button>
          </li>
          {!isLoggedIn && (
            <li>
              <button onClick={() => handleNavigation("/login")}>Login</button>
            </li>
          )}
          {/* {!isLoggedIn && (
            <li>
              <button onClick={() => handleNavigation("/register")}>
                Register
              </button>
            </li>
          )} */}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout} className="logout-link">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Candidate Referral Management System</h1>
      <h4>
        Our platform simplifies the process of referring candidates, tracking
        their progress, and managing their status all in one place. Whether
        you're a recruiter, hiring manager, or just referring someone, it's
        designed to streamline the referral process.
      </h4>

      <p>
        <strong>Key Features:</strong>
      </p>
      <ul>
        <li>Easily refer candidates with their details (name, email, job title, resume).</li>
        <li>Track the status of referred candidates (Pending, Reviewed, Hired).</li>
        <li>Search and filter candidates by job title or status.</li>
        <li>Get real-time updates on candidate status changes.</li>
      </ul>

      <h5>
        To get started, simply log in or register. Once logged in, you can refer
        candidates, track their progress, or manage their status.
      </h5>

      <h5>
        We take data privacy seriously. Your referred candidates' information is
        securely stored and accessible only by authorized users.
      </h5>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/refer" element={<ReferralForm />} />
      </Routes>
    </Router>
  );
};

export default App;
