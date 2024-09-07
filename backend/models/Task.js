const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });  // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Task', taskSchema);
