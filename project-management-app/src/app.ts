import express from "express";
import cors from "cors";
import sequelize from "./models"; // Import sequelize instance
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration to allow requests from the frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// API routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Serve static files from the 'build' directory
// app.use(
//   express.static(
//     path.join(__dirname, "../../project-management-frontend/build")
//   )
// );

// Serve the React app
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../../project-management-frontend/build/index.html")
//   );
// });

// Sync database with the current models
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

export default app;
