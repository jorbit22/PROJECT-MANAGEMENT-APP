import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

/**
 * The ProjectDetails component displays the details of a project.
 * It shows the project's name, description, and due date.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {string} props.name - The name of the project.
 * @param {string} props.description - A brief description of the project.
 * @param {string} props.dueDate - The due date of the project in string format.
 */
const ProjectDetails: React.FC<{
  name: string;
  description: string;
  dueDate: string;
}> = ({ name, description, dueDate }) => {
  return (
    <Card>
      {/* Display the project's name with a title style */}
      <Title level={2}>{name}</Title>

      {/* Display the project's description */}
      <p>
        <strong>Description:</strong> {description}
      </p>

      {/* Display the project's due date formatted as a human-readable date */}
      <p>
        <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
      </p>
    </Card>
  );
};

export default ProjectDetails;
