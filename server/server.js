const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});