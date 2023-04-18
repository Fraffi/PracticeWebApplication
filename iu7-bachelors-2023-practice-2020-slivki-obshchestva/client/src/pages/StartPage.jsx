import React, { Component } from 'react';
import faker from 'faker';
import PropType from 'prop-types';
import Header from '../components/Header';
import TasksList from '../components/TasksList';

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    faker.locale = 'ru';
    this.userInfo = {
      avatar: faker.image.avatar(),
      name: faker.name.findName('', '', undefined)
    };
  }

  handleSearchChange = (e) => {
    this.setState({
      searchText: e.target.value
    });
  };

  render() {
    const activeGroupId =
      this.props.groups.find(({ isActive }) => isActive) || undefined;
    const findTask = this.state.searchText;
    return (
      <>
        <div className="section">
          <Header
            groupTitle={activeGroupId ? activeGroupId.name : undefined}
            onChangeHandler={this.handleSearchChange}
            groups={this.props.groups}
          />
          <TasksList
            tasks={
              this.props.tasks
                ? this.props.tasks.filter(
                    ({ groupId, title }) =>
                      (!activeGroupId.id || groupId === activeGroupId.id) &&
                      title.toLowerCase().indexOf(findTask.toLowerCase()) !== -1
                  )
                : undefined
            }
            deleteOnClick={this.props.deleteOnClick}
          />
        </div>
      </>
    );
  }
}

StartPage.propTypes = {
  groups: PropType.arrayOf(PropType.object).isRequired,
  tasks: PropType.arrayOf(PropType.object).isRequired,
  deleteOnClick: PropType.func.isRequired
};

export default StartPage;
