import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { apiService } from '../apiService';

function AddTask() {
  const navigate = useNavigate();
  const { dispatch } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const newTask = await apiService.addTask({
        ...formData,
        userId: 1 // Required by JSONPlaceholder
      });
  
      console.log('New Task:', newTask); // Debugging
  
      dispatch({ type: 'ADD_TASK', payload: newTask });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="completed" className="ml-2 block text-sm text-gray-700">
            Mark as completed
          </label>
        </div>
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Adding Task...' : 'Add Task'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
