import React from 'react';
import { CheckCircle, Circle, AlertCircle, ListTodo } from 'lucide-react';

const TaskStats = ({ tasks }) => {
  const total = tasks.length;
  const active = tasks.filter(task => task.status === 'active').length;
  const completed = tasks.filter(task => task.status === 'completed').length;
  const overdue = tasks.filter(task => {
    if (task.status === 'completed') return false;
    const today = new Date().setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate).setHours(0, 0, 0, 0);
    return dueDate < today;
  }).length;

  const stats = [
    { label: 'All Tasks', value: total, color: 'bg-blue-500', icon: ListTodo },
    { label: 'Active', value: active, color: 'bg-green-500', icon: Circle },
    { label: 'Completed', value: completed, color: 'bg-purple-500', icon: CheckCircle },
    { label: 'Overdue', value: overdue, color: 'bg-red-500', icon: AlertCircle },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Overview</h3>
      {/* Mobile: 2 columns, Desktop: 4 columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className={`${stat.color} p-1.5 sm:p-2 rounded-lg text-white`}>
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStats;