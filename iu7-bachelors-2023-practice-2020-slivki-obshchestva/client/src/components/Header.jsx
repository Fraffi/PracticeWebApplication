import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import SearchBar from './SearchBar';
import Modal from './Modal';
import AddTask from './modals/AddTask';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  openModalHandler = () => {
    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen
    }));
  };

  render() {
    const FadeIn = styled.div`
      animation: 0.4s ${keyframes`${fadeIn}`} linear;
    `;
    const { modalOpen } = this.state;
    return (
      <div className="container">
        <header className="header">
          <div className="header__group-name">
            <FadeIn>{this.props.groupTitle}</FadeIn>
          </div>

          <button
            className="button header__button"
            type="button"
            onClick={this.openModalHandler}
          >
            <span className="button__text-add">Добавить Задачу</span>
            <span className="button__text-mobile">+</span>
          </button>
        </header>
        <SearchBar onChangeHandler={this.props.onChangeHandler} />
        {modalOpen && (
          <Modal onClose={this.openModalHandler}>
            <AddTask groups={this.props.groups} />
          </Modal>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  groupTitle: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object)
};

Header.defaultProps = {
  groups: undefined
};

export default Header;
