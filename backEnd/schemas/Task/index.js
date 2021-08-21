const mongoose = require('mongoose');

const Task = new mongoose.Schema({
  email: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  fileName: {
    type: String,
  },
  filePath: {
    type: String,
  },
  enteredBy: {
    type: Object,
  },
  createdAt: {
    type: String,
  },
});

export const TaskSchema = mongoose.model('Task', Task);
