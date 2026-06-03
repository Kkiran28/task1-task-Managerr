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
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(tasks, null, 2)
  );
};

// Home route
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});


// =======================
// GET ALL TASKS
// =======================
app.get("/api/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});


// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});