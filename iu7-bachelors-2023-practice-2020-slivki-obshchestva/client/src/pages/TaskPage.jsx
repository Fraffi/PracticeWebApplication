import React, { Component } from 'react';
import TaskHeader from '../components/TaskHeader';
import TaskMain from '../components/TaskMain';

class TaskPage extends Component {
  render() {
    return (
      <div className="task__container">
        <TaskHeader title="Название задачи" />
        <TaskMain />
      </div>
    );
  }
}

export default TaskPage;
