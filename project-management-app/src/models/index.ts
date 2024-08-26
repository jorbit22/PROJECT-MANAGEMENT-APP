import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Use environment variables for database connection details
const databaseName = process.env.DB_NAME!;
const username = process.env.DB_USER!;
const password = process.env.DB_PASSWORD!;
const host = process.env.DB_HOST!;
const port = parseInt(process.env.DB_PORT!, 10);

// Create Sequelize instance
const sequelize = new Sequelize(databaseName, username, password, {
  host,
  port,
  dialect: "mysql",
  logging: console.log, // Enable logging to see SQL queries and connection details
});

// Sync all models and associations
const syncModels = async () => {
  try {
    // Sync models (drop tables if they already exist)
    await sequelize.sync({ force: false });
    console.log("Database synced");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

// Call the sync function
syncModels();

export default sequelize;
