import React, { Component } from 'react';
import TaskPanel from './TaskPanel';
import Task from './Task';

class TaskMain extends Component {
  render() {
    return (
      <>
        <TaskPanel />
        <Task />
      </>
    );
  }
}

export default TaskMain;
