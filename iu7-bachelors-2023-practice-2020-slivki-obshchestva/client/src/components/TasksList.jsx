import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function TasksList({ tasks, deleteOnClick }) {
  const taskList = tasks
    ? tasks.map(({ id, title, groupTitle, shared }) => {
        return (
          <div className="task" key={id}>
            <div className="task__title">
              <Link to={`/task/${id}`} className="task__name">
                <div>{title}</div>
              </Link>
              <div className="task__group">{groupTitle}</div>
            </div>
            <div className="task__info">
              <div className="task__access">
                {shared ? 'Доступ по ссылке открыт' : 'Доступ по ссылке закрыт'}
              </div>
              <button
                className="task__delete"
                type="button"
                onClick={() => {
                  deleteOnClick(id);
                }}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
            <div className="task__info--icon">
              <i className="fas fa-info-circle" />
            </div>
          </div>
        );
      })
    : undefined;
  return <div className="tasks">{taskList}</div>;
}

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteOnClick: PropTypes.func.isRequired
};

export default TasksList;
