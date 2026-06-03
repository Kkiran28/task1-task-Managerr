import { useState } from "react";
import TaskStats from "./components/TaskStats";

function App() {
  const [tasks] = useState([
    {
      id: 1,
      title: "Learn React",
      completed: false,
      dueDate: "2026-06-01",
    },
    {
      id: 2,
      title: "Build Project",
      completed: true,
      dueDate: "2026-05-30",
    },
    {
      id: 3,
      title: "Fix Bugs",
      completed: false,
      dueDate: "2026-05-25",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

      {/* TASK STATS */}
      <TaskStats tasks={tasks} />
    </div>
  );
}

export default App;