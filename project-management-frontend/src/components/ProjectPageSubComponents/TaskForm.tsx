import React from "react";
import { Form, Input, Button, Card } from "antd";

interface TaskFormProps {
  onFinish: (values: {
    name: string;
    description: string;
    status: string;
  }) => void;
  initialValues?: {
    name?: string;
    description?: string;
    status?: string;
  };
  form: any;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onFinish,
  initialValues = {},
  form,
}) => {
  return (
    <Card>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Task Name"
          rules={[{ required: true, message: "Please enter the task name" }]}
        >
          <Input placeholder="Enter task name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Enter task description" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select the status" }]}
          initialValue={initialValues.status ?? "pending"}
        >
          <Input placeholder="Enter task status" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues.name ? "Update Task" : "Add Task"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
