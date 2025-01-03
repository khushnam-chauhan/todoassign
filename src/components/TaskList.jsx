// components/TaskList.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

function TaskList() {
  const { state, dispatch } = useTaskContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        const limitedData = data.slice(0, 10).map(task => ({
          ...task,
          description: `Task description for ${task.title}`
        }));
        dispatch({ type: 'SET_TASKS', payload: limitedData });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>
      <div className="grid gap-4">
        {state.tasks.map(task => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h3 className="font-medium text-lg">{task.title}</h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-sm ${
                task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
              <Link
                to={`/edit/${task.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;