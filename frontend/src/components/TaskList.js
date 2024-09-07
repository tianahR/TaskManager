import React from 'react';

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  return (
    <div className="list-group mt-4">
      {tasks.map((task) => (
        <div key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">{task.title} - {task.completed ? 'Complete' : 'Incomplete'}</h5>
            <p className="mb-1">{task.description}</p>
          </div>
          <div>
            <button className="btn btn-danger btn-sm me-2" onClick={() => deleteTask(task._id)}>Delete</button>
            <button className="btn btn-primary btn-sm" onClick={() => updateTask(task)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;