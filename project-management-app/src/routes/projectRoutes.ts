import { Request, Response, Router } from "express";
import { Project } from "../models/central";
import { Task } from "../models/central";
import authMiddleware, { AuthRequest } from "../middlewares/authMiddleware";
import { literal, Op } from "sequelize";

const router = Router();

router.get("/filter", async (req: Request, res: Response) => {
  try {
    const { name, startDate, endDate, minTasks, taskStatus } = req.query;

    // Initialize filters object with proper typing
    const filters: any = {};

    // Filter by project name
    if (name) {
      filters.name = {
        [Op.like]: `%${name}%`,
      };
    }

    // Filter by due date range
    if (startDate && endDate) {
      filters.dueDate = {
        [Op.between]: [
          new Date(startDate as string),
          new Date(endDate as string),
        ],
      };
    }

    // Initialize query options
    const queryOptions: any = {
      where: filters,
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: [], // Only count the tasks
        },
      ],
      group: ["Project.id"], // Group by project ID
    };

    // Filter by minimum number of tasks
    if (minTasks) {
      queryOptions.having = literal(`COUNT(tasks.id) >= ${minTasks}`);
    }

    // Filter by task status
    if (taskStatus) {
      queryOptions.include[0].where = {
        status: taskStatus,
      };
    }

    const projects = await Project.findAll(queryOptions);

    res.json(projects);
  } catch (err) {
    console.error("Error filtering projects:", err);
    res.status(500).json({ error: "Failed to filter projects" });
  }
});
// Create Project
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { name, description, dueDate } = req.body;
    const project = await Project.create({
      name,
      description,
      dueDate,
      userId: req.userId,
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/user", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;
    const projects = await Project.findAll({ where: { userId } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user projects" });
  }
});

// Get All Projects
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const projects = await Project.findAll({ where: { userId: req.userId } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get Project by ID
router.get("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    console.log("this", req.userId);

    // Find the project
    const project = await Project.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Find tasks associated with the project
    const tasks = await Task.findAll({
      where: { projectId: project.id },
    });

    // Add tasks to project
    project.dataValues.tasks = tasks;

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update Project
router.put("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { name, description, dueDate } = req.body;
    const project = await Project.update(
      { name, description, dueDate },
      { where: { id: req.params.id, userId: req.userId } }
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete Project
router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id, userId: req.userId } });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
