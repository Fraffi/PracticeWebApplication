const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    groupId: { type: String, required: true },
    title: { type: String, required: true },
    honorid: { type: String, required: true },
    shared: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
