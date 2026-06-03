import React from 'react';
import { Calendar, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  const isOverdue = () => {
    if (task.status === 'completed') return false;
    const today = new Date().setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate).setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const overdue = isOverdue();

  return (
    <div className={`bg-white rounded-lg p-4 border transition-all hover:shadow-md ${
      task.status === 'completed' ? 'opacity-75 bg-gray-50' : ''
    } ${overdue ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex flex-col sm:flex-row items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id, task.status)}
          className="mt-1 focus:outline-none"
        >
          {task.status === 'completed' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1">
          <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs ${overdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                <Calendar className="w-3 h-3" />
                <span>{formatDate(task.dueDate)}</span>
                {overdue && <span className="ml-1 text-red-600">(Overdue)</span>}
              </div>
            )}
            <span className={`text-xs px-2 py-1 rounded-full ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {task.status === 'completed' ? 'Completed' : 'Active'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;