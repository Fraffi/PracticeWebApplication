import React, { Component } from 'react';
import API from '../../utils/API';

class AddUndertask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undertaskName: ''
    };
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onSave(e) {
    const name = this.state.undertaskName;
    if (name.length) {
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await API.post('/undertasks/create', {
          name,
          honorid: '5ec8fc104b0ef12c9477f388'
        });
      } catch (err) {
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  }

  onChange(e) {
    e.preventDefault();
    const undertaskName = e.target.value;
    this.setState({ undertaskName });
  }

  render() {
    return (
      <div className="modal__add">
        <div className="modal__add--title">Добавление новой подзадачи</div>
        <form className="modal__add--form" onSubmit={this.onSave}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="modal__add--label" htmlFor={0}>
            Добавить новую подзадачу:
          </label>
          <input
            type="text"
            className="modal__add--input"
            placeholder="Введите название задачи"
            value={this.state.undertaskName}
            onChange={this.onChange}
          />
          <button className="modal__button" type="submit">
            Добавить
          </button>
        </form>
      </div>
    );
  }
}

export default AddUndertask;
