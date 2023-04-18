import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import API from '../../utils/API';
import { customStyles, customTheme } from './selectStyles';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: ''
    };
    this.taskName = React.createRef();
    this.shared = React.createRef();
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  async onSubmitHandler(e) {
    const { groupId } = this.state;
    const title = this.taskName.current.value;
    const shared = this.shared.current.checked;
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await API.post('/tasks/create', {
        groupId,
        title,
        shared,
        honorid: '5ec8fc104b0ef12c9477f388'
      });
    } catch (err) {
      e.preventDefault();
    }
  }

  onSelectHandler = ({ value }) => {
    this.setState({ groupId: value });
  };

  render() {
    const options = [];
    if (this.props.groups)
      this.props.groups.forEach((group) => {
        if (group.id) options.push({ value: group.id, label: group.name });
      });
    return (
      <div className="modal__add">
        <div className="modal__add--title">Добавление новой задачи</div>
        <form className="modal__add--form" onSubmit={this.onSubmitHandler}>
          <div className="modal__form--content">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="modal__add--label" htmlFor={0}>
              Добавить новую задачу:
            </label>
            <input
              type="text"
              className="modal__add--input modal__input--task"
              placeholder="Введите название задачи"
              ref={this.taskName}
            />
          </div>
          <div className="modal__form--content select--content">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="modal__add--label" htmlFor={0}>
              Добавить новую задачу:
            </label>
            <Select
              options={options}
              className="modal__add--select"
              theme={customTheme}
              placeholder="Выберите группу"
              styles={customStyles}
              name="select-group"
              onChange={this.onSelectHandler}
              isSearchable
              clearIndicator
            />
          </div>
          <div className="modal__form--content">
            <p className="form__checkbox--text">
              <input
                type="checkbox"
                id="check"
                name="check"
                defaultValue=""
                className="checkbox__input"
                ref={this.shared}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="check" className="checkbox--label">
                <span />
                Открыть доступ по ссылке
              </label>
            </p>
            <button className="modal__button add-task__button" type="submit">
              Добавить
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddTask.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AddTask;
