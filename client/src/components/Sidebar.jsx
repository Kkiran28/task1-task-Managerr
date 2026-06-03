import React from 'react';
import { LayoutDashboard, ListTodo, Calendar, BarChart3, Settings, Plus, CheckCircle, Circle, AlertCircle } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, tasks, onAddTask }) => {
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => task.status === 'active' || task.completed === false).length;
  const completedTasks = tasks.filter(task => task.status === 'completed' || task.completed === true).length;
  
  const overdueTasks = tasks.filter(task => {
    const isCompleted = task.status === 'completed' || task.completed === true;
    if (isCompleted) return false;
    if (!task.dueDate) return false;
    const today = new Date().setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate).setHours(0, 0, 0, 0);
    return dueDate < today;
  }).length;

  return (
    <aside className="hidden md:block w-64 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl fixed h-full overflow-y-auto border-r border-slate-700">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">Organize your task</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'tasks' 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <ListTodo className="w-4.5 h-4.5" />
            All Tasks
          </button>
          <button
            onClick={onAddTask}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4.5 h-4.5" />
            Add Task
          </button>
        </nav>

        {/* Task Stats Section */}
        <div className="pt-6 border-t border-slate-700">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Overview
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm px-1">
              <span className="text-slate-300">Total Tasks</span>
              <span className="font-semibold text-slate-100">{totalTasks}</span>
            </div>
            <div className="flex justify-between items-center text-sm px-1">
              <span className="text-slate-300">Active</span>
              <span className="font-semibold text-emerald-400">{activeTasks}</span>
            </div>
            <div className="flex justify-between items-center text-sm px-1">
              <span className="text-slate-300">Completed</span>
              <span className="font-semibold text-blue-400">{completedTasks}</span>
            </div>
            {overdueTasks > 0 && (
              <div className="flex justify-between items-center text-sm px-1">
                <span className="text-slate-300">Overdue</span>
                <span className="font-semibold text-red-400">{overdueTasks}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;