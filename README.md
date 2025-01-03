# Todo Manager

Todo Manager is a simple React application for managing tasks. It allows users to view, add, edit, and delete tasks with a seamless UI. The project is built using React, React Router, and a context-based state management approach.

---

## Features

- View a list of tasks with their details (title, description, and status).
- Add new tasks.
- Edit existing tasks.
- Delete tasks.
- Data is managed through an API (JSONPlaceholder).

---

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For routing between different views.
- **Context API with Reducer**: For state management.
- **TailwindCSS**: For styling.
- **JSONPlaceholder**: A mock REST API for testing.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-manager.git
   cd todo-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will run at `http://localhost:3000/` by default.

---

## Project Structure

```plaintext
src
├── apiService.js       # API methods for interacting with JSONPlaceholder
├── components
│   ├── AddTask.js      # Component for adding a new task
│   ├── EditTask.js     # Component for editing an existing task
│   └── TaskList.js     # Component for displaying the list of tasks
├── context
│   └── TaskContext.js  # Context and reducer for state management
├── App.js              # Main application file
├── index.js            # Entry point of the application
└── styles.css          # Custom styles (if any)
```

---

## API Integration

The app uses the following API endpoints from JSONPlaceholder:

1. **Fetch all tasks**:
   ```plaintext
   GET https://jsonplaceholder.typicode.com/todos
   ```

2. **Add a new task**:
   ```plaintext
   POST https://jsonplaceholder.typicode.com/todos
   ```

3. **Update a task**:
   ```plaintext
   PUT https://jsonplaceholder.typicode.com/todos/:id
   ```

4. **Delete a task**:
   ```plaintext
   DELETE https://jsonplaceholder.typicode.com/todos/:id
   ```

---

## How to Use

1. **Home Page**:
   - View the list of tasks.
   - Edit or delete a task using the respective buttons.

2. **Add Task**:
   - Click on the "Add Task" link in the navigation bar.
   - Fill in the form and submit to add a new task.

3. **Edit Task**:
   - Click the "Edit" button next to a task.
   - Modify the fields and save changes.

---
