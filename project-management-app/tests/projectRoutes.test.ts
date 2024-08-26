import request from "supertest";
import app from "../src/app"; // Import your Express app
import { User, Project } from "../src/models/central"; // Import your models
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
  await Project.bulkCreate([
    {
      name: "Filter Project",
      description: "Description",
      dueDate: new Date(),
      userId,
    },
    {
      name: "User Project",
      description: "Description",
      dueDate: new Date(),
      userId,
    },
    {
      name: "Project by ID",
      description: "Description",
      dueDate: new Date(),
      userId,
    },
    {
      name: "Old Project",
      description: "Description",
      dueDate: new Date(),
      userId,
    },
    {
      name: "Delete Project",
      description: "Description",
      dueDate: new Date(),
      userId,
    },
  ]);
};

describe("Project Routes", () => {
  let token: string;
  let userId: number;

  beforeEach(async () => {
    const user = await mockUser();
    userId = user.id;
    token = mockToken(userId);

    // Create mock projects for testing
    await createMockProjects(userId);
  });

  // Test Create Project
  it("should create a new project", async () => {
    const response = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New Project",
        description: "Project Description",
        dueDate: new Date().toISOString(),
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "New Project");
  });

  // Test Filter Projects
  it("should filter projects by name", async () => {
    const response = await request(app)
      .get("/api/projects/filter")
      .query({ name: "Filter" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("name", "Filter Project");
  });

  // Test Get All Projects
  it("should get all projects for the user", async () => {
    const response = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
    expect(response.body[0]).toHaveProperty("name", "Filter Project");
  });

  // Test Get Project by ID
  it("should get a project by ID", async () => {
    const project = await Project.findOne({ where: { name: "Project by ID" } });

    if (project) {
      const response = await request(app)
        .get(`/api/projects/${project.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Project by ID");
    } else {
      fail("Project not found");
    }
  });

  // Test Update Project
  it("should update a project", async () => {
    const project = await Project.findOne({ where: { name: "Old Project" } });

    if (project) {
      const response = await request(app)
        .put(`/api/projects/${project.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Project",
          description: "Updated Description",
          dueDate: new Date(),
        });

      expect(response.status).toBe(200);
      expect(response.body[0]).toBe(1); // Sequelize returns [number of affected rows]
    } else {
      fail("Project not found");
    }
  });

  // Test Delete Project
  it("should delete a project", async () => {
    const project = await Project.findOne({
      where: { name: "Delete Project" },
    });

    if (project) {
      const response = await request(app)
        .delete(`/api/projects/${project.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Project deleted");
    } else {
      fail("Project not found");
    }
  });
});
