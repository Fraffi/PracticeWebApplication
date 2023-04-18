import React, { Component } from 'react';
import faker from 'faker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import API from './utils/API';
import StartPage from './pages/StartPage';
import Navigation from './components/Navigation';
import Loader from './pages/Loader';
import './static/css/checkbox.css';
import './static/css/index.css';
import TaskPage from './pages/TaskPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.userInfo = {
      avatar: faker.image.avatar(),
      name: faker.internet.userName(),
      id: '5ec8fc104b0ef12c9477f388'
    };
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentDidMount() {
    API.get(`/users/${this.userInfo.id}`).then(({ data }) => {
      const groups = [
        {
          id: 0,
          name: 'Все Задачи',
          isActive: true
        }
      ];
      data.groups.forEach((group) => {
        group.isActive = false;
        // eslint-disable-next-line no-underscore-dangle
        group.id = group._id;
      });
      groups.push(...data.groups);
      const { tasks } = data;
      tasks.forEach((task) => {
        // eslint-disable-next-line no-underscore-dangle
        task.id = task._id;
        task.groupTitle = groups.find(({ id }) => id === task.groupId).name;
      });
      this.setState({ groups, tasks, isLoading: false });
    });
  }

  async onClickDelete(id) {
    try {
      const { tasks } = this.state;
      // eslint-disable-next-line no-unused-vars
      const res = await API.delete(`/tasks/${id}`);

      this.setState({
        tasks: tasks.filter((el) => el.id !== id)
      });
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  }

  handleClick = (id) => {
    const { groups } = this.state;
    groups.forEach((group) => (group.isActive = group.id === id));
    this.setState({ groups });
  };

  render() {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <Router>
        <div className="main">
          <Navigation
            groups={this.state.groups}
            user={this.userInfo}
            onClickHandler={this.handleClick}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <StartPage
                  groups={this.state.groups}
                  tasks={this.state.tasks}
                  deleteOnClick={this.onClickDelete}
                />
              )}
            />
            <Route path="/task/:id" component={TaskPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
