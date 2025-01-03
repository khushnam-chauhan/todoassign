import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { apiService } from '../apiService';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentTask = state.tasks.find(t => t.id === parseInt(id));
    if (currentTask) {
      setFormData({
        title: currentTask.title,
        description: currentTask.description || '',
        completed: currentTask.completed
      });
    } else {
      setError('Task not found');
    }
  }, [id, state.tasks]);

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
      const updatedTask = await apiService.updateTask(parseInt(id), {
        ...formData,
        id: parseInt(id),
        userId: 1 // Required by JSONPlaceholder
      });
  
      console.log('Updated Task:', updatedTask); // Debugging
  
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setLoading(true);
    setError(null);

    try {
      await apiService.deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: parseInt(id) });
      navigate('/');
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
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
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;

