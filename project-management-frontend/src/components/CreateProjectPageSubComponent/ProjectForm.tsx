import React from "react";
import { Button, Input, DatePicker, Form } from "antd";
import { FormInstance } from "antd/es/form";

// Subcomponent for the project creation form
interface ProjectFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  loading: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  form,
  onFinish,
  loading,
}) => {
  return (
    <Form form={form} onFinish={onFinish}>
      {/* Form field for project name */}
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input the project name!" }]}
      >
        <Input placeholder="Project Name" />
      </Form.Item>

      {/* Form field for project description */}
      <Form.Item name="description">
        <Input.TextArea placeholder="Project Description" />
      </Form.Item>

      {/* Form field for project due date */}
      <Form.Item
        name="dueDate"
        rules={[{ required: true, message: "Please select the due date!" }]}
      >
        <DatePicker />
      </Form.Item>

      {/* Submit button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
