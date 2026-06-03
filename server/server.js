const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, "data", "tasks.json");

// Helper: Read tasks
const readTasks = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper: Write tasks
const writeTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

app.get("/", (req, res) => {
  res.send("🚀 Task Manager Backend Running");
});

//Get all tasks
app.get("/api/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// CREATE TASK
app.post("/api/tasks", (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  const tasks = readTasks();

  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    description: description || "",
    dueDate: dueDate || null,
    priority: priority || "medium",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json({
    message: "Task created successfully",
    task: newTask,
  });
});

// UPDATE TASK
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(
    (task) => task.id === id
  );
  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body,
    id: tasks[taskIndex].id,
  };

  writeTasks(tasks);

  res.json({
    message: "Task updated successfully",
    task: tasks[taskIndex],
  });
});

//DELETE TASK
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();

  const filteredTasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === filteredTasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }

  writeTasks(filteredTasks);

  res.json({
    message: "Task deleted successfully",
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port:${PORT}`);
});