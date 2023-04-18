import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskHeader extends Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <div className="header__group-name">{this.props.title}</div>
          <button className="button header__delete--button" type="button">
            <span className="button__delete">
              <i className="fas fa-trash" />
            </span>
          </button>
        </header>
      </div>
    );
  }
}

TaskHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default TaskHeader;
