import request from "supertest";
import app from "../src/app"; // Import your Express app
import { User } from "../src/models/central"; // Import your User model
// import sequelize from "../src/models"; // Import your sequelize instance
import sequelize from "./setupTests";

beforeAll(async () => {
  await sequelize.sync({ force: false }); // Create a fresh database for each test
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection
});

describe("User Routes", () => {
  // Test registration
  it("should register a new user", async () => {
    const response = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Test User");
    expect(response.body).toHaveProperty("email", "testuser@example.com");
    expect(response.body).not.toHaveProperty("password"); // Ensure password is not returned
  });

  // Test duplicate email
  it("should not allow duplicate email", async () => {
    await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/users/register").send({
      name: "Another User",
      email: "testuser@example.com",
      password: "password456",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Email already in use");
  });

  // Test login with valid credentials
  it("should return a token for valid credentials", async () => {
    await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/users/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  // Test login with invalid credentials
  it("should not return a token for invalid credentials", async () => {
    await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/users/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid credentials");
  });
});
