import { useState } from "react";
import TaskStats from "./components/TaskStats";
import SearchBar from "./components/SearchBar";

function App() {
  // Sample tasks
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

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tasks based on search
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Task Dashboard
      </h1>

      {/* SEARCH BAR */}
      <div className="max-w-md mx-auto mb-6">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* SEARCH RESULT INFO */}
      <p className="text-center mb-4 text-gray-600">
        You searched:{" "}
        <span className="font-semibold text-black">
          {searchQuery || "Nothing yet"}
        </span>
      </p>

      {/* TASK STATS */}
      <TaskStats tasks={filteredTasks} />

      {/* TASK LIST */}
      <div className="mt-6 max-w-md mx-auto space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks found 😢
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-500">
                  Due: {task.dueDate}
                </p>
              </div>

              <span
                className={`text-sm px-2 py-1 rounded ${
                  task.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.completed ? "Done" : "Pending"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;