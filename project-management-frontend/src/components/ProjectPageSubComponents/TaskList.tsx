import React from "react";
import { List, Row, Col, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Task } from "../../pages/types";

/**
 * The TaskList component renders a list of tasks for a project.
 * It provides options to edit or delete each task.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Task[]} props.tasks - The array of tasks to be displayed.
 * @param {function} props.onEdit - Callback function to handle editing a task.
 * @param {function} props.onDelete - Callback function to handle deleting a task.
 */
const TaskList: React.FC<{
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}> = ({ tasks, onEdit, onDelete }) => {
  return (
    <List
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item>
          <Row style={{ width: "100%" }}>
            {/* Display the task's name and status */}
            <Col span={16}>
              <strong>{task.name}</strong> - {task.status}
            </Col>

            {/* Provide buttons for editing and deleting the task */}
            <Col span={8} style={{ textAlign: "right" }}>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => onEdit(task)}
              />
              <Popconfirm
                title="Are you sure you want to delete this task?"
                onConfirm={() => onDelete(task.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default TaskList;
