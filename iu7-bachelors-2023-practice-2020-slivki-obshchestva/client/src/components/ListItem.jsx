import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {
  render() {
    return (
      <>
        <li className="task__list--task">
          <p className="form__checkbox--text">
            <input
              type="checkbox"
              id={this.props.id}
              name="check"
              defaultValue=""
              className="checkbox__input"
              ref={this.shared}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={this.props.id} className="checkbox--label">
              <span className="task--title" />
              {this.props.title}
            </label>
          </p>
          <span>
            <button
              type="button"
              className="task_add"
              onClick={this.props.openModalHandler}
            >
              <i className="fas fa-plus" />
            </button>
            <button className="task__delete" type="button">
              <i className="fas fa-trash" />
            </button>
          </span>
        </li>
        <hr />
      </>
    );
  }
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  openModalHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default ListItem;
