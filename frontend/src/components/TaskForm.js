import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    const newTask = { title, description, completed: false };
    addTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form className="card card-body mb-4" onSubmit={handleSubmit}>
      <h3 className="mb-3">Add New Task</h3>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
      </div>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
      </div>
      <button type="submit" className="btn btn-success">Add Task</button>
    </form>
  );
};

export default TaskForm;