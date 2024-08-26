import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import SignUpForm from "../components/SignUpPageSubComponents/SignUpForm"; // Import the SignUpForm component

const SignUpPage: React.FC = () => {
  return (
    <div style={{ padding: "24px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      {/* Render the SignUpForm component */}
      <SignUpForm />

      <p style={{ textAlign: "center", marginTop: "16px" }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
