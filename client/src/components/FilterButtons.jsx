import React from 'react';
import { ListTodo, Circle, CheckCircle } from 'lucide-react';

const FilterButtons = ({ filterStatus, setFilterStatus }) => {
  const filters = [
    { value: 'all', label: 'All', icon: ListTodo },
    { value: 'active', label: 'Active', icon: Circle },
    { value: 'completed', label: 'Completed', icon: CheckCircle },
  ];

  return (
    <div className="flex gap-2">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => setFilterStatus(filter.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            filterStatus === filter.value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <filter.icon className="w-4 h-4" />
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;