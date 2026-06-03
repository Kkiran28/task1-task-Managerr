import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add task
  const addTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      setTasks(prev => [response.data.task, ...prev]);
      return { success: true, task: response.data.task };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to add task' };
    }
  };

  // Edit task
  const editTask = async (id, taskData) => {
    try {
      const response = await updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === id ? response.data.task : task
      ));
      return { success: true, task: response.data.task };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to update task' };
    }
  };

  // Delete task
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Failed to delete task' };
    }
  };

  // Toggle task status
  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'completed' : 'active';
    return await editTask(id, { status: newStatus });
  };

  // Filtered and searched tasks
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks: getFilteredTasks(),
    allTasks: tasks,
    loading,
    error,
    filterStatus,
    searchQuery,
    setFilterStatus,
    setSearchQuery,
    addTask,
    editTask,
    removeTask,
    toggleTaskStatus,
    fetchTasks,
  };
};