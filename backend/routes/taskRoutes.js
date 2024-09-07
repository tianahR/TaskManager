const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Route to get all tasks and create a new task
router.route('/tasks').get(getAllTasks).post(createTask);

// Route to get, update, and delete a specific task
router.route('/tasks/:id').get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
