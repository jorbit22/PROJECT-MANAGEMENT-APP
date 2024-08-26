import React, { useEffect, useState } from "react";
import { Typography, Spin, Button } from "antd";
import dayjs, { Dayjs } from "dayjs";
import axios from "../utils/api";
import { Project } from "./types";
import ProjectCardList from "../components/homePageSubComponent/ProjectCardList";
import ProjectFilters from "../components/homePageSubComponent/ProjectFilters";
import isBetween from "dayjs/plugin/isBetween";
import { isAxiosError } from "../utils/typeGuards"; // Import the type guard

dayjs.extend(isBetween);

const { Title } = Typography;

const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    name: "",
    dueDateRange: [] as [Dayjs, Dayjs] | [],
    minTasks: null as number | null,
    taskStatus: "",
  });

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await axios.get("/projects/user");
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError("Your session has expired. Please log in again.");
          } else {
            setError("Failed to load projects");
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, []);

  const applyFilters = async () => {
    try {
      const response = await axios.get("/projects/filter", {
        params: {
          name: filters.name,
          startDate: filters.dueDateRange[0]
            ? filters.dueDateRange[0].format("YYYY-MM-DD")
            : undefined,
          endDate: filters.dueDateRange[1]
            ? filters.dueDateRange[1].format("YYYY-MM-DD")
            : undefined,
          minTasks: filters.minTasks,
          taskStatus: filters.taskStatus,
        },
      });
      setFilteredProjects(response.data);
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else {
          setError("Failed to filter projects");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleDelete = async (projectId: number) => {
    try {
      await axios.delete(`/projects/${projectId}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
      setFilteredProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else {
          setError("Failed to delete project");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        Project List
      </Title>

      <ProjectFilters
        filters={filters}
        handleFilterChange={(changedFields) =>
          setFilters((prevFilters) => ({ ...prevFilters, ...changedFields }))
        }
        applyFilters={applyFilters}
      />

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p>{error}</p>
        </div>
      ) : (
        <ProjectCardList
          projects={filteredProjects}
          handleDelete={handleDelete}
        />
      )}

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Button type="primary" size="large" href="/create-project">
          Create New Project
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
