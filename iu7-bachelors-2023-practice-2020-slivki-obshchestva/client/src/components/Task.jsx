import React, { Component } from 'react';
import faker from 'faker';
import ListItem from './ListItem';
import Loader from '../pages/Loader';
import Modal from './Modal';
import AddUndertask from './modals/AddUndertask';
import { task } from '../fake/task_response.json';

function TaskList(task, func) {
  return (
    <>
      <ListItem
        title={task.task.title}
        id={task.task.id}
        openModalHandler={func}
      />
      <ul className="task__list">
        {task.task.children.map((child) => TaskList(child, func))}
      </ul>
    </>
  );
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      isLoading: true
    };
    this.userInfo = {
      avatar: faker.image.avatar(),
      name: faker.internet.userName(),
      id: '5ec8fc104b0ef12c9477f388'
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  openModalHandler = () => {
    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen
    }));
  };

  render() {
    const { modalOpen } = this.state;
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="task tasks__list">
        {task[0].children.length ? (
          task[0].children.map((child) =>
            TaskList(child, this.openModalHandler)
          )
        ) : (
          <div />
        )}
        {modalOpen && (
          <Modal onClose={this.openModalHandler}>
            <AddUndertask />
          </Modal>
        )}
      </div>
    );
  }
}

export default Task;
