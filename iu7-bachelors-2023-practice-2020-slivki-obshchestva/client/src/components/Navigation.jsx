import PropTypes from 'prop-types';
import React, { Component } from 'react';
import faker from 'faker';
import classNames from 'classnames/bind';
import Groups from './Groups';
import User from './User';
import Modal from './Modal';
import AddGroup from './modals/AddGroup';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modalAddGroupOpen: false
    };
  }

  handleToggleModal = () => {
    this.setState(({ modalAddGroupOpen }) => ({
      modalAddGroupOpen: !modalAddGroupOpen
    }));
  };

  handleClick = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div
        className={classNames({
          navigation: true,
          'navigation--active': isOpen
        })}
      >
        <User user={this.props.user} />
        <Groups
          groups={this.props.groups}
          onClickHandler={this.props.onClickHandler}
          onClickClose={this.handleClick}
        />
        <div className="button__nav">
          <button
            className="navigation__add-group button"
            type="button"
            onClick={this.handleToggleModal}
          >
            Добавить Группу
          </button>
        </div>
        <div
          className="open"
          onClick={this.handleClick}
          role="button"
          tabIndex={0}
        >
          <div
            className={classNames({
              open__icon: true,
              'open__icon--active': isOpen
            })}
          />
        </div>
        {this.state.modalAddGroupOpen && (
          <Modal onClose={this.handleToggleModal}>
            <AddGroup />
          </Modal>
        )}
      </div>
    );
  }
}

Navigation.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickHandler: PropTypes.func.isRequired,
  user: PropTypes.exact({
    avatar: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string.isRequired
  })
};

Navigation.defaultProps = {
  user: {
    avatar: faker.image.avatar(),
    name: 'No User',
    id: faker.random.number()
  }
};

export default Navigation;
