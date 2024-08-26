// src/SignUpPageSubComponents/SignUpForm.tsx

import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import api from "../../utils/api"; // Import the API utility for making requests
import { AxiosError } from "axios"; // Import AxiosError type for error handling

const SignUpForm: React.FC = () => {
  // State variables to store user input
  const [name, setName] = useState(""); // State to store the user's name
  const [email, setEmail] = useState(""); // State to store the user's email
  const [password, setPassword] = useState(""); // State to store the user's password

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Send a POST request to the server with the user's details
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });
      console.log("Registration successful:", response.data); // Log successful registration response

      // Alert the user that registration was successful
      alert("Registration successful! You can now log in.");
    } catch (error) {
      // Handle errors during registration
      if (error instanceof AxiosError) {
        console.error(
          "Error registering:",
          error.response?.data || error.message
        );
        alert(
          `Error registering: ${error.response?.data?.error || error.message}`
        );
      } else {
        console.error("Unexpected error:", error);
        alert("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      {/* Input field for name */}
      <Form.Item>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state on input change
        />
      </Form.Item>
      {/* Input field for email */}
      <Form.Item>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on input change
        />
      </Form.Item>
      {/* Input field for password */}
      <Form.Item>
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on input change
        />
      </Form.Item>
      {/* Button to submit the form */}
      <Button type="primary" htmlType="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
