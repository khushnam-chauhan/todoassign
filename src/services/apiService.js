const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const apiService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      return data.slice(0, 10).map(task => ({
        ...task,
        description: `Description for ${task.title}`
      }));
    } catch (error) {
      throw new Error('Failed to fetch tasks');
    }
  },

  // Add new task
  addTask: async (taskData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const data = await response.json();
      // Merge the returned data with the original task data
      return { ...taskData, ...data };
    } catch (error) {
      console.error('Error adding task:', error);
      throw new Error('Failed to add task');
    }
  },

  // Update task
  updateTask: async (id, taskData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const data = await response.json();
      // Merge the updated data with the original task data
      return { ...taskData, ...data };
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  },


  // Delete task
  deleteTask: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      return id;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }
};
