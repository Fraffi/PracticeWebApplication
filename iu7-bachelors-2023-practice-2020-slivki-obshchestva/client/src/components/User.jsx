import PropTypes from 'prop-types';
import React from 'react';

function User({ user }) {
  const { name, avatar } = user;
  return (
    <div className="user">
      <img src={avatar} alt="avatar" className="user__avatar" />
      <div className="user__name">{name}</div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.exact({
    avatar: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired
};

export default User;
