// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg p-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Todo Manager</h1>
              <div className="space-x-4">
                <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
                <Link to="/add" className="text-blue-600 hover:text-blue-800">Add Task</Link>
              </div>
            </div>
          </nav>
          <main className="max-w-4xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add" element={<AddTask />} />
              <Route path="/edit/:id" element={<EditTask />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;