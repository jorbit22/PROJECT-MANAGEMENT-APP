import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import { beforeAll, afterAll, afterEach } from "@jest/globals";

// Load the environment variables from the test-specific .env file
dotenv.config({ path: ".env.test" });

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    dialect: "mysql",
    logging: false, // Disable logging for cleaner test output
  }
);

beforeAll(async () => {
  console.log("Creating tables...");

  await sequelize.getQueryInterface().createTable("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  await sequelize.getQueryInterface().createTable("projects", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  await sequelize.getQueryInterface().createTable("tasks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "projects",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  console.log("Tables created.");
});

afterEach(async () => {
  console.log("Clearing data...");

  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
  await sequelize.query("TRUNCATE TABLE tasks;");
  await sequelize.query("TRUNCATE TABLE projects;");
  await sequelize.query("TRUNCATE TABLE users;");
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");

  console.log("Data cleared.");
});

afterAll(async () => {
  console.log("Dropping tables...");

  await sequelize.getQueryInterface().dropTable("tasks");
  await sequelize.getQueryInterface().dropTable("projects");
  await sequelize.getQueryInterface().dropTable("users");

  await sequelize.close();

  console.log("Tables dropped and connection closed.");
});

export default sequelize;
