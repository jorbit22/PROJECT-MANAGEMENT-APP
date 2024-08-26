import React, { useState } from "react";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addProject } from "../store/projectSlice";
import api from "../utils/api";
import ProjectForm from "../components/CreateProjectPageSubComponent/ProjectForm";

// Main component for creating a new project
const CreateProjectPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/projects",
        {
          name: values.name,
          description: values.description,
          dueDate: values.dueDate.format("YYYY-MM-DD"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(addProject(response.data)); // Add the project to Redux store
      setLoading(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creating project:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <ProjectForm form={form} onFinish={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateProjectPage;
