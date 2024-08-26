import { Router } from "express";
import { Task } from "../models/central";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, projectId, status } = req.body;

    // Validate the status if needed
    const validStatuses = ["completed", "inprogress", "pending"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const task = await Task.create({ name, description, projectId, status });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Tasks for a Project
router.get("/project/:projectId", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { projectId: req.params.projectId },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update Task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const [updated] = await Task.update(
      { name, description, status },
      { where: { id: req.params.id }, returning: true }
    );

    if (updated === 0) {
      // If no rows were updated, the task was not found
      return res.status(404).json({ message: "Task not found" });
    }

    // Find the updated task
    const updatedTask = await Task.findByPk(req.params.id);
    if (updatedTask) {
      res.status(200).json(updatedTask); // Return the updated task
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
