import React from "react";
import { Layout, Button } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./CustomHeader.scss";

const { Header } = Layout;

const CustomHeader: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    setToken(null); // Update context token
    setIsAuthenticated(false); // Update authentication status
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <Header className="custom-header">
      <div className="custom-header-title">
        <Link to="/" className="home-link">
          PROJECT MANAGEMENT APP
        </Link>
      </div>
      {isAuthenticated && (
        <Button type="primary" onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      )}
    </Header>
  );
};

export default CustomHeader;
