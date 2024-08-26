// src/SignInPageSubComponents/SignInForm.tsx

import React from "react";
import { Form, Input, Button } from "antd"; // Import Form, Input, and Button components from Ant Design
import { useNavigate } from "react-router-dom"; // Import hook to navigate between pages
import { useAuth } from "../../context/useAuth"; // Import authentication context
import api from "../../utils/api"; // Import the API utility for making requests
import { AxiosError } from "axios"; // Import AxiosError type for error handling

interface SignInFormProps {
  form: any; // The form instance from Ant Design
}

const SignInForm: React.FC<SignInFormProps> = ({ form }) => {
  const navigate = useNavigate(); // Create a navigate function to handle page transitions
  const { setIsAuthenticated, setToken } = useAuth(); // Access functions to update authentication state

  // Function to handle form submission
  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log("Form values submitted:", values); // Log submitted form values for debugging
    try {
      // Send login request to the server
      const response = await api.post("/users/login", values);
      console.log("Login successful:", response.data); // Log successful login response
      // Save the token to localStorage and update context
      localStorage.setItem("token", response.data.token);
      setToken?.(response.data.token); // Update context token
      setIsAuthenticated(true); // Update authentication status
      navigate("/"); // Redirect to the home page
    } catch (error) {
      // Handle errors during login
      if (error instanceof AxiosError) {
        console.error(
          "Error logging in:",
          error.response?.data || error.message
        );
        alert(
          `Error logging in: ${error.response?.data?.error || error.message}`
        );
      } else {
        console.error("Unexpected error:", error);
        alert("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      {/* Input field for email */}
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      {/* Input field for password */}
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      {/* Button to submit the form */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignInForm;
