import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import EditTaskForm from './components/EditTaskForm'; 
import './App.css';  // Importing global styles

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
   const [tasks, setTasks] = useState([]);      // State for holding all tasks
   const [loading, setLoading] = useState(true); // State to manage loading state
   const [editingTask, setEditingTask] = useState(null); // State to hold the task being edited



  // Fetch tasks from the backend API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);  // Update the state with the fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this effect runs once on component mount



  // Add toast notifications to show success/error messages
  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, response.data]);
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Error adding task');
    }
  };

  // Function to delete a task and update state
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));  // Remove the task from the local state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

 

  const startEditingTask = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? response.data : task))); // Update the state with the edited task
      setEditingTask(null); // Clear the editing state after successful update
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null); // Clear the editing state
  };

  // Render the main application layout
  return (
    <div className="container mt-5">
      <header className="mb-4">
        <h1 className="text-center">Task Manager</h1>
      </header>

      <main>
        {editingTask ? (
          <EditTaskForm task={editingTask} onUpdate={updateTask} onCancel={cancelEdit} />
        ) : (
          <>
            <TaskForm addTask={addTask} />
            {loading ? (
              <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={startEditingTask} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;

