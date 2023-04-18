import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class TaskPanel extends Component {
  render() {
    return (
      <div className="task-panel">
        <NavLink to="/" exact className="button-back">
          <span>
            <i className="fas fa-arrow-circle-left" />
            Назад
          </span>
        </NavLink>
        <button className="button add__task" type="button">
          Добавить задачу
        </button>
      </div>
    );
  }
}

export default TaskPanel;
