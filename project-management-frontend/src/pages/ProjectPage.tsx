import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, message, Form } from "antd";
import axios from "../utils/api";
import ProjectDetails from "../components/ProjectPageSubComponents/ProjectDetails";
import TaskList from "../components/ProjectPageSubComponents/TaskList";
import TaskForm from "../components/ProjectPageSubComponents/TaskForm";
import TaskEditModal from "../components/ProjectPageSubComponents/TaskEditModal";
import { Project, Task } from "./types";

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        const projectResponse = await axios.get(`/projects/${projectId}`);
        setProject(projectResponse.data);

        const tasksResponse = await axios.get(`/tasks/project/${projectId}`);
        setTasks(tasksResponse.data);
      } catch (err) {
        console.error("Error fetching project and tasks:", err);
        setError("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndTasks();
  }, [projectId]);

  const handleAddTask = async (values: {
    name: string;
    description: string;
    status: string;
  }) => {
    try {
      await axios.post(`/tasks`, { ...values, projectId });
      message.success("Task added successfully");

      const tasksResponse = await axios.get(`/tasks/project/${projectId}`);
      setTasks(tasksResponse.data);

      form.resetFields();
    } catch (err) {
      console.error("Error adding task:", err);
      message.error("Failed to add task");
    }
  };

  const handleEditTask = async (values: {
    name: string;
    description: string;
    status: string;
  }) => {
    try {
      if (editingTask) {
        await axios.put(`/tasks/${editingTask.id}`, values);
        message.success("Task updated successfully");

        const tasksResponse = await axios.get(`/tasks/project/${projectId}`);
        setTasks(tasksResponse.data);

        form.resetFields();
        setEditingTask(null);
      }
    } catch (err) {
      console.error("Error updating task:", err);
      message.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      message.success("Task deleted successfully");

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      message.error("Failed to delete task");
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    form.setFieldsValue({
      name: task.name,
      description: task.description,
      status: task.status,
    });
  };

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "auto" }}>
      {project && (
        <ProjectDetails
          name={project.name}
          description={project.description}
          dueDate={project.dueDate}
        />
      )}
      <TaskList
        tasks={tasks}
        onEdit={openEditModal}
        onDelete={handleDeleteTask}
      />
      <TaskForm onFinish={handleAddTask} form={form} />
      {editingTask && (
        <TaskEditModal
          visible={!!editingTask}
          onCancel={() => setEditingTask(null)}
          onFinish={handleEditTask}
          editingTask={editingTask}
          form={form}
        />
      )}
    </div>
  );
};

export default ProjectPage;
