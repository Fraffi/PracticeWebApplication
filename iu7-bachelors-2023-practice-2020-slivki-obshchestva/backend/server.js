const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
const tasksRouter = require('./routes/tasks');
const undertasksRouter = require('./routes/undertasks');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/tasks', tasksRouter);
app.use('/undertasks', undertasksRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port: ', port);
});
