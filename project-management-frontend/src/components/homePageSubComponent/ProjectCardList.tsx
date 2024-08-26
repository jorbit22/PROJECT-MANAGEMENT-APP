import React from "react";
import { Row, Col, Card, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Project } from "../../pages/types";
import { Link } from "react-router-dom";

// Descriptive comments for each prop
interface ProjectCardListProps {
  projects: Project[];
  handleDelete: (projectId: number) => void;
}

const ProjectCardList: React.FC<ProjectCardListProps> = ({
  projects,
  handleDelete,
}) => {
  return (
    <Row gutter={[32, 32]}>
      {/* Map through projects and display each in a Card component */}
      {projects.map((project) => (
        <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
          <Card
            title={project.name}
            extra={
              <div>
                <Link to={`/project/${project.id}`}>
                  <Button type="link">More Details</Button>
                </Link>
                <Popconfirm
                  title="Are you sure you want to delete this project?"
                  onConfirm={() => handleDelete(project.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            }
            hoverable
            style={{
              width: "100%",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            bodyStyle={{ padding: "16px" }}
          >
            {/* Display project description and due date */}
            <p style={{ marginBottom: "8px" }}>
              <strong>Description:</strong> {project.description}
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Due Date:</strong>{" "}
              {new Date(project.dueDate).toLocaleDateString()}
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProjectCardList;
