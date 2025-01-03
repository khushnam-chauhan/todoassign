import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { CheckCircle, Circle, Edit2 } from 'lucide-react';

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
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Your Tasks</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {state.tasks.map(task => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
                {task.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-yellow-500" />
                )}
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{task.description}</p>
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/edit/${task.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-400 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
