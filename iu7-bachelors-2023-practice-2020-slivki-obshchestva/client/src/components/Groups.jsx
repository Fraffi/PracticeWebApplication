import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames/bind';

function Groups({ groups, onClickClose, onClickHandler }) {
  return (
    <div className="navigation__content">
      <nav className="navigation__groups">
        {groups.map(({ isActive, id, name }) => (
          <div
            className={classNames({
              'navigation__group--link': true,
              'navigation__group--link--active': isActive
            })}
            onClick={() => {
              onClickHandler(id);
              onClickClose();
            }}
            key={id}
            role="menuitem"
            tabIndex={0}
          >
            {name}
          </div>
        ))}
      </nav>
    </div>
  );
}

Groups.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickClose: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func.isRequired
};

export default Groups;
