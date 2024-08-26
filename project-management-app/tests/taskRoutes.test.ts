import request from "supertest";
import app from "../src/app"; // Import your Express app
import { User, Project, Task } from "../src/models/central"; // Import your models
// import sequelize from "../src/models"; // Import your sequelize instance
import jwt from "jsonwebtoken";
import sequelize from "./setupTests";

// Setup and teardown for tests
beforeAll(async () => {
  await sequelize.sync({ force: false }); // Create a fresh database for each test
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection
});

// Utility functions
const mockUser = async () => {
  return await User.create({
    name: "Test User",
    email: "testuser@example.com",
    password: "password123",
  });
};

const mockToken = (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

const createMockProjects = async (userId: number) => {
  return await Project.create({
    name: "Test Project",
    description: "Description",
    dueDate: new Date(),
    userId,
  });
};

const createMockTasks = async (projectId: number) => {
  return await Task.bulkCreate([
    {
      name: "Task 1",
      description: "Description 1",
      projectId,
      status: "inprogress",
    },
    {
      name: "Task 2",
      description: "Description 2",
      projectId,
      status: "completed",
    },
  ]);
};

describe("Task Routes", () => {
  let token: string;
  let userId: number;
  let projectId: number;

  beforeEach(async () => {
    const user = await mockUser();
    userId = user.id;
    token = mockToken(userId);

    const project = await createMockProjects(userId);
    projectId = project.id;

    await createMockTasks(projectId);
  });

  // Test Create Task
  it("should create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New Task",
        description: "Task Description",
        projectId,
        status: "pending",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "New Task");
    expect(response.body).toHaveProperty("description", "Task Description");
  });

  // Test Get All Tasks for a Project
  it("should get all tasks for a project", async () => {
    const response = await request(app)
      .get(`/api/tasks/project/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test Update Task
  it("should update a task", async () => {
    const task = await Task.findOne({ where: { name: "Task 1" } });

    if (task) {
      const response = await request(app)
        .put(`/api/tasks/${task.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Task Name",
          description: "Updated Description",
          status: "completed",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Updated Task Name");
    } else {
      fail("Task not found");
    }
  });

  // Test Delete Task
  it("should delete a task", async () => {
    const task = await Task.findOne({ where: { name: "Task 1" } });

    if (task) {
      const response = await request(app)
        .delete(`/api/tasks/${task.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Task deleted");
    } else {
      fail("Task not found");
    }
  });
});
