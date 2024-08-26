// src/SignInPageSubComponents/SignInPage.tsx

import React from "react";
import { Form, Button } from "antd"; // Import Form and Button components from Ant Design
import { useNavigate } from "react-router-dom"; // Import hook to navigate between pages
import SignInForm from "../components/SignInPageSubComponents/SignInForm"; // Import the SignInForm component

const SignInPage: React.FC = () => {
  const [form] = Form.useForm(); // Create an instance of the Form from Ant Design
  const navigate = useNavigate(); // Create a navigate function to handle page transitions

  return (
    <div style={{ padding: "24px", maxWidth: "400px", margin: "auto" }}>
      {/* Render the SignInForm component and pass the form instance to it */}
      <SignInForm form={form} />
      <Form.Item style={{ marginTop: "16px" }}>
        {/* Button to navigate to the Sign-Up page */}
        <Button type="link" onClick={() => navigate("/signup")}>
          Don't have an account? Sign Up
        </Button>
      </Form.Item>
    </div>
  );
};

export default SignInPage;
