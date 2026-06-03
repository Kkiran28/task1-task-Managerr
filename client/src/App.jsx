import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  // Initially empty tasks array
  const [tasks, setTasks] = useState([]);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description || "",
      status: taskData.status || "active",
      completed: taskData.status === "completed",
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
    setIsFormOpen(false);
  };

  const handleEditTaskSubmit = (taskData) => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTask.id
        ? {
            ...task,
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            completed: taskData.status === "completed",
            dueDate: taskData.dueDate,
          }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? {
            ...task,
            status: task.status === "active" ? "completed" : "active",
            completed: !task.completed
          }
        : task
    ));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];
    if (filterStatus !== "all") {
      filtered = filtered.filter(task => task.status === filterStatus);
    }
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tasks={tasks}
        onAddTask={() => setIsFormOpen(true)}
      />

      <main className="flex-1 ml-0 md:ml-64">
        <div className="md:hidden bg-white border-b shadow-sm px-4 py-3 space-y-3 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">Task Manager</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              + Add
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm ${activeTab === 'tasks' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Tasks
            </button>
          </div>
        </div>
        {activeTab === "dashboard" && (
          <Dashboard
            tasks={tasks}
            onAddTask={() => setIsFormOpen(true)}
            onEditTask={handleEditClick}
            onDeleteTask={handleDeleteTask}
            onToggleTask={handleToggleTask}
          />
        )}
        
        {activeTab === "tasks" && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mb-3"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-3 py-1 rounded text-sm ${filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus("active")}
                  className={`px-3 py-1 rounded text-sm ${filterStatus === "active" ? "bg-yellow-600 text-white" : "bg-gray-200"}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterStatus("completed")}
                  className={`px-3 py-1 rounded text-sm ${filterStatus === "completed" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  Completed
                </button>
              </div>
            </div>

            {tasks.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No tasks yet</h3>
                <p className="text-gray-500 mb-4">Click the + button to create your first task</p>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  + Create New Task
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="divide-y">
                  {filteredTasks.map(task => (
                    <div key={task.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div>
                        <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{task.dueDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleTask(task.id)}
                          className={`px-3 py-1 rounded text-sm ${task.completed ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                        >
                          {task.completed ? "Active" : "Completed"}
                        </button>
                        <button
                          onClick={() => handleEditClick(task)}
                          className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="px-3 py-1 rounded text-sm bg-red-100 text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {(activeTab === "calendar" || activeTab === "analytics" || activeTab === "settings") && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-xl font-semibold text-gray-800">Coming Soon</h2>
              <p className="text-gray-500 mt-2">This feature is under development</p>
            </div>
          </div>
        )}
      </main>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingTask ? handleEditTaskSubmit : handleAddTask}
        task={editingTask}
      />
    </div>
  );
}

export default App;