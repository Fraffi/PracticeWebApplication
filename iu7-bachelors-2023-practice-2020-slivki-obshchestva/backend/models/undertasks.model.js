const mongoose = require('mongoose');

const { Schema } = mongoose;

const undertaskSchema = new Schema(
  {
    rootId: { type: String, required: true },
    children: { type: Array, required: true },
    title: { type: String, required: true },
    taskid: { type: String, required: true },
    done: { type: Boolean, required: true },
    groupId: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const UnderTask = mongoose.model('UnderTask', undertaskSchema);

module.exports = UnderTask;
