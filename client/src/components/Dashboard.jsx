import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle, Circle, Plus } from 'lucide-react';
import TaskStats from './TaskStats';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';

const Dashboard = ({ tasks, onAddTask, onEditTask, onDeleteTask, onToggleTask }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStatusBadge = (task) => {
    if (task.status === 'completed' || task.completed) {
      return { text: 'Completed', color: 'text-green-600 bg-green-50' };
    }
    if (new Date(task.dueDate) < new Date() && task.status !== 'completed') {
      return { text: 'Overdue', color: 'text-red-600 bg-red-50' };
    }
    return { text: 'Active', color: 'text-yellow-600 bg-yellow-50' };
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex-1 max-w-md">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* TaskStats */}
        <div className="mb-6">
          <TaskStats tasks={tasks} />
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex justify-center">
          <FilterButtons filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
            <button
              onClick={onAddTask}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
          
          {tasks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No tasks yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first task</p>
              <button
                onClick={onAddTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Create New Task
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No matching tasks</h3>
              <p className="text-gray-500">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredTasks.map(task => {
                const status = getStatusBadge(task);
                
                return (
                  <div key={task.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    {/* Task Info */}
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="mt-0.5 focus:outline-none"
                      >
                        {task.status === 'completed' || task.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                        )}
                      </button>
                      
                      <div>
                        <h3 className={`font-medium text-sm ${
                          task.status === 'completed' || task.completed 
                            ? 'line-through text-gray-500' 
                            : 'text-gray-800'
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">
                            {formatDate(task.dueDate)}
                          </p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                            {status.text}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEditTask(task)}
                        className="p-1.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1.5 bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;